const router = require("express").Router();
const cart_controller = require("../controllers/cartController");
const { isNotAuth } = require("../middlewares/auth");

router.post("/cart", isNotAuth("/"), cart_controller.post_cart);

router.post("/cart/checkout", isNotAuth("/"), cart_controller.post_checkout);

module.exports = router;
