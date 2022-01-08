const router = require("express").Router();
const cart_controller = require("../controllers/cartController");
const { isNotAuth } = require("../middlewares/auth");

router.post("/cart/create-order", isNotAuth("/"), cart_controller.create_order);

router.post("/cart/checkout/:orderID", isNotAuth("/"), cart_controller.capture_order);

module.exports = router;
