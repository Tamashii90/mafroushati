const Product = require("../models/Product");
const Order = require("../models/Order");
const { updateOne } = require("../models/Product");

exports.post_cart = async (req, res) => {
  const { listOfProds } = req.body;
  const listOfIds = listOfProds.map(prod => prod._id);
  try {
    // fetch all products that aren't out of stock
    const products = await Product.find(
      { "_id": { $in: listOfIds }, "quantity_in_stock": { $gt: 0 } },
      { "name": 1, "price_per_piece": 1, "img_url": 1, "quantity_in_stock": 1 },
      { lean: true }
    );
    res.status(200).send({ error: false, body: products });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

exports.post_checkout = async (req, res) => {
  // Price can only be set by the backend !
  if (req.body.total) return res.status(400).send();

  try {
    const [productsInCart, user] = [req.body, req.user._id];
    const listOfIds = productsInCart.map(prod => prod._id);
    const productsInDb = await Product.find(
      { "_id": { $in: listOfIds }, "quantity_in_stock": { $gt: 0 } },
      { "price_per_piece": 1, "quantity_in_stock": 1 }
    );
    const total = Product.calcTotal({ productsInCart, productsInDb });
    const order = new Order({ user, products: productsInCart, total });

    const bulkUpdates = [];
    for (const prodInDb of productsInDb) {
      const qtyDiff = productsInCart.find(
        prodInCart => prodInCart._id === String(prodInDb._id)
      ).quantityInCart;
      bulkUpdates.push({
        updateOne: {
          filter: { _id: prodInDb._id },
          update: { $inc: { "quantity_in_stock": -1 * qtyDiff } }
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
    if (err.errors)
      return res
        .status(400)
        .send({ error: true, message: "Something went wrong." });
    return res.status(500).send();
  }
};
