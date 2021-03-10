const router = require("express").Router();
const {
  isAlreadyAuth,
  isNotAuth,
  isNotAdmin,
  passport_auth_middleware
} = require("../middlewares/auth");
const user_controller = require("../controllers/userController");

// isAlreadyAuth middleware prevents the user from manually going to the register or login page
// if they are already registered/logged in
router.get("/current_user", user_controller.get_user);
// router.get('/login', isAlreadyAuth('/', 'You are already logged in !'), user_controller.get_login);
// router.get('/register', isAlreadyAuth('/', 'You already have an account !'), user_controller.get_register);

router.post(
  "/logout",
  isNotAuth("/", "You aren't logged in !"),
  user_controller.post_logout
);
router.post(
  "/login/test",
  isAlreadyAuth("/", "You are already logged in !"),
  passport_auth_middleware,
  user_controller.post_login
);
router.post(
  "/register/test",
  isAlreadyAuth("/", "You already have an account !"),
  user_controller.post_register
);

router.patch(
  "/user",
  isNotAuth("/", "Insufficient privileges."),
  user_controller.patch_user
);

module.exports = router;
