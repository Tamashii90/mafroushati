const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = (mongooseConnection) => {
    return session({
        name: 'session-id',
        secret: process.env.SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 1000 * 3600 * 24 * 14 }, // 14 days
        store: new MongoStore({ mongooseConnection })
    })
};
