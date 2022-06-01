const Product = require("../models/Product");
const Review = require("../models/Review");
const imgur_upload = require("../utils/imgur");

exports.get_product = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id).lean();
		if (!product) return res.status(400).send({ error: true, message: "Product not found." });
		res.send(product);
	} catch (err) {
		res.status(500).send(err);
	}
};
exports.get_recent = async (req, res) => {
	try {
		const products = await Product.find(
			{},
			{ "__v": 0, "featured": 0, "updatedAt": 0, "reviews": 0 },
			{
				lean: true,
				sort: { "createdAt": -1 },
				limit: 9
			}
		);
		res.send(products);
	} catch (err) {
		res.status(500).send();
	}
};
exports.get_featured = async (req, res) => {
	try {
		const products = await Product.find(
			{ featured: true },
			{ "__v": 0, "featured": 0, "updatedAt": 0, "reviews": 0 },
			{
				lean: true,
				limit: 10
			}
		);
		res.send(products);
	} catch (err) {
		res.status(500).send();
	}
};
exports.get_category = async (req, res) => {
	const category = req.params.category;
	const minPrice = Number(req.query.min) || 0;
	const maxPrice = Number(req.query.max) || Infinity;
	const limit = 9;
	const skip = req.query.skip * limit;
	try {
		const result = await Product.aggregate([
			{ $match: { category } },
			{
				$facet: {
					max: [
						{ $project: { "price_per_piece": 1 } },
						{ $sort: { "price_per_piece": -1 } },
						{ $limit: 1 }
					],
					min: [
						{ $project: { "price_per_piece": 1 } },
						{ $sort: { "price_per_piece": 1 } },
						{ $limit: 1 }
					],
					products: [
						{ $match: { "price_per_piece": { $gte: minPrice, $lte: maxPrice } } },
						{ $limit: limit },
						{ $skip: skip }
					],
					count: [{ $count: "count" }]
				}
			},
			{
				$addFields: {
					max: { $first: "$max.price_per_piece" },
					min: { $first: "$min.price_per_piece" },
					count: { $first: "$count.count" }
				}
			}
		]);
		res.send(result[0]);
	} catch (err) {
		res.status(500).send();
	}
};
exports.get_search = async (req, res) => {
	const { q } = req.query;
	try {
		const products = await Product.find(
			{ $text: { $search: q } },
			{
				featured: 0,
				reviews: 0,
				updatedAt: 0,
				__v: 0
			},
			{
				sort: { score: { $meta: "textScore" } },
				lean: true,
				limit: 9
			}
		);
		res.send(products);
	} catch (err) {
		res.status(500).send();
	}
};

exports.post_product = async (req, res) => {
	try {
		const img_url = await imgur_upload(req.file);
		await new Product({ ...req.body, img_url }).save();
		req.flash("info", "Successfully added product.");
		res.status(201).send();
	} catch (err) {
		if (err.errors) {
			req.flash("error", err.errors);
			// No need for the regular JSON response for this endpoint
			// because it's handled by handlebars using req.flash()
			return res.status(400).send(err.errors);
		}
		console.log(err);
		res.status(500).send({ error: true, message: "Server error." });
	}
};

exports.patch_product = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(400).send({ error: true, message: "Product not found." });
		}
		if (req.file) {
			const img_url = await imgur_upload(req.file);
			Object.assign(product, { ...req.body, img_url });
		} else Object.assign(product, { ...req.body });
		await product.save();
		res.status(200).send({ error: false, message: "Changes applied." });
	} catch (err) {
		if (err.errors) {
			return res.status(400).send({ error: true, message: err._message, body: err.errors });
		}
		res.status(500).send({ error: true, message: "Server error." });
	}
};

exports.delete_product = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(400).send({ error: true, message: "Product not found." });
		}
		const transacSession = await Product.db.startSession();
		await transacSession.withTransaction(() => {
			const removeProduct = product.remove({ session: transacSession });
			const removeReviews = Review.deleteMany({ "prodId": product._id }, { session: transacSession });
			return Promise.all([removeReviews, removeProduct]);
		});
		res.status(200).send({ error: false, message: "Product deleted." });
	} catch (err) {
		res.status(500).send();
	}
};
