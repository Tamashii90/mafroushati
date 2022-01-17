const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true
		},
		user: {
			type: String,
			trim: true,
			required: "Email is required",
			minlength: [3, "Email is too short."],
			maxlength: [255, "Email is too long."]
		},
		message: {
			type: String,
			trim: true,
			required: true,
			minlength: [2, "Message is too short."],
			maxlength: [255, "Message is too long."]
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("feedback", FeedbackSchema);
