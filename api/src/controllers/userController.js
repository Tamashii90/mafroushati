const User = require("../models/User");

exports.get_login = (req, res) => {
  res.render("login");
};
exports.get_register = (req, res) => {
  res.render("register");
};
exports.get_user = (req, res) => {
  if (req.user) {
    return res.send({ error: false, body: req.user });
  }
  return res.send({ error: false, body: null });
};

exports.post_logout = (req, res) => {
  req.logout();
  res.status(200).send({ error: false, message: "Logged out successfully." });
};
exports.post_login = (req, res) => {
  res.status(200).send({ error: false, message: "Logged in.", body: req.user });
};
exports.post_register = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    const userObj = { _id: user._id, username: user.username };
    if (user.admin) userObj.admin = user.admin;
    req.login(userObj, () => {
      res.status(200).send({
        error: false,
        message: "Registered successfully.",
        body: userObj
      });
    });
  } catch (err) {
    if (err.errors) {
      return res.status(400).send({ error: true, body: err.errors, message: err._message });
    }
    res.status(500).send({ error: true, message: "Server error." });
  }
};

exports.patch_user = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    Object.assign(user, req.body);
    await user.save();
    res.send({ error: false, message: "Changes saved." });
  } catch (err) {
    if (err.errors) {
      return res.status(400).send({ error: true, message: err._message, body: err.errors });
    }
    res.stats(500).send();
  }
};
