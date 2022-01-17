const router = require("express").Router();
const feedback_controller = require("../controllers/feedbackController");

router.post("/feedback", feedback_controller.create_message);

module.exports = router;
