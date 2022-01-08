const mongoose = require("mongoose");

const MiniProdSchema = new mongoose.Schema({
	_id: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "product"
	},
	quantityInCart: {
		type: Number,
		required: true,
		min: 1
	}
});

const OrderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true
		},
		paypal_email: {
			type: String,
			required: true
		},
		products: {
			type: [MiniProdSchema],
			required: true
		},
		total: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("order", OrderSchema);
