const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') },
                { "username": 1, "password": 1, "admin": 1 })
                .lean();
            if (!user) return done(null, false, { error: 'Invalid Credentials.' });
            const pwdIsValid = await bcrypt.compare(password, user.password);
            if (!pwdIsValid) return done(null, false, { error: 'Invalid Credentials.' });
            delete user.password;   // no need to store password in req.user
            if (!user.admin) delete user.admin;  // no need to return it if not admin
            done(null, user);
        } catch (err) {
            done(err);
        }
    }));
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id, { "username": 1, "admin": 1 }).lean();
        // I don't want to send the admin property back if the user isn't admin
        if (!user.admin) delete user.admin;
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});

module.exports = passport;