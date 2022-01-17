const Feedback = require("../models/Feedback");

exports.create_message = async (req, res) => {
	const message = req.body;
	try {
		await new Feedback(message).save();
		res.send({ error: false });
	} catch (err) {
		if (err.errors) res.status(400).send();
		else res.status(500).send();
	}
};
