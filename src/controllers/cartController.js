const fetch = require("node-fetch");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.create_order = async (req, res) => {
	const { listOfProds: cartProducts } = req.body;
	const listOfIds = cartProducts.map(prod => prod._id);
	try {
		// fetch all products that aren't out of stock
		const dbProducts = await Product.find(
			{ _id: { $in: listOfIds }, quantity_in_stock: { $gt: 0 } },
			{ name: 1, price_per_piece: 1, quantity_in_stock: 1 },
			{ lean: true }
		);
		const prodsPairing = makeProdsPairing({ dbProducts, cartProducts, res });
		const total = prodsPairing.reduce((acc, prod) => {
			const price = Number(prod.unit_amount.value) * prod.quantity;
			return acc + price;
		}, 0);
		const orderObject = makeOrder({ total, prodsPairing });
		const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
			method: "POST",
			headers: {
				"Authorization": process.env.PAYPAL_AUTH_HEADER,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(orderObject)
		});

		if (!response.ok) throw new Error("Server error.");

		const { id: orderID } = await response.json();
		res.status(200).send({ error: false, orderID });
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};

exports.capture_order = async (req, res) => {
	const { orderID } = req.params;
	try {
		const response = await fetch(
			`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
			{
				method: "POST",
				headers: {
					"Authorization": process.env.PAYPAL_AUTH_HEADER,
					"Content-Type": "application/json",
					"Prefer": "return=representation"
				}
			}
		);

		if (!response.ok) throw new Error("Server error.");

		const capturedOrder = await response.json();
		const total = capturedOrder.purchase_units[0].amount.value;
		const payerEmail = capturedOrder.payer.email_address;
		const boughtProds = capturedOrder.purchase_units[0].items;

		const user = req.user._id;
		const productsToSave = boughtProds.map(prod => ({
			_id: prod.sku,
			quantityInCart: prod.quantity
		}));
		const order = new Order({ user, paypal_email: payerEmail, products: productsToSave, total });

		const bulkUpdates = [];
		for (const prod of productsToSave) {
			bulkUpdates.push({
				updateOne: {
					filter: { _id: prod._id },
					update: { $inc: { "quantity_in_stock": -1 * Number(prod.quantityInCart) } }
				}
			});
		}
		// ---- start a transaction
		const transacSession = await Product.db.startSession();
		await transacSession.withTransaction(() => {
			const writeToOrders = order.save({ session: transacSession });
			const writeToProducts = Product.bulkWrite(bulkUpdates, {
				session: transacSession
			});
			return Promise.all([writeToProducts, writeToOrders]);
		});
		transacSession.endSession();
		// ----
		res.send({ error: false, message: "Purchase is successful." });
	} catch (err) {
		console.log(err);
		if (err.errors) {
			return res.status(400).send({ error: true, message: "Something went wrong." });
		}
		return res.status(500).send();
	}
};

function makeProdsPairing({ dbProducts, cartProducts, res }) {
	const result = [];

	for (let dbProduct of dbProducts) {
		const cartProduct = cartProducts.find(el => el._id === dbProduct._id.toString());

		if (cartProduct.quantity < 0 || cartProduct.quantity > dbProduct.quantity_in_stock) {
			return res.status(400).send({ error: true });
		}

		const prodObject = {
			sku: cartProduct._id,
			name: dbProduct.name,
			unit_amount: { currency_code: "USD", value: String(dbProduct.price_per_piece) },
			quantity: cartProduct.quantity
		};
		result.push(prodObject);
	}
	return result;
}

function makeOrder({ total, prodsPairing }) {
	return {
		intent: "CAPTURE",
		purchase_units: [
			{
				amount: {
					currency_code: "USD",
					value: String(total),
					breakdown: {
						item_total: {
							currency_code: "USD",
							value: String(total)
						}
					}
				},
				items: prodsPairing
			}
		],
		application_context: {
			shipping_preference: "GET_FROM_FILE",
			user_action: "PAY_NOW",
			brand_name: "Mafroushati"
		}
	};
}
