const passport = require('../utils/passport');
const User = require('../models/User');

exports.passport_auth_middleware = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(401).send({ error: true, message: "Invalid credentials." })
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return next();
        });
    })(req, res, next);
};

exports.isNotAdmin = function (redirect, flash) {
    return async function (req, res, next) {
        try {
            const _id = req.user && req.user._id;
            const admin = await User.findOne({ _id, admin: true });
            if (!admin) return res.redirect(redirect);
            return next();
        } catch (err) {
            res.status(500).send();
        }
    }
};

exports.isNotAuth = function (redirect) {
    return function (req, res, next) {
        if (req.isUnauthenticated()) {
            return res.redirect(redirect);
        }
        return next();
    }
};

exports.isAlreadyAuth = function (redirect, flash) {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            req.flash('error', flash);
            return res.redirect(redirect);
        }
        return next();
    }
};
