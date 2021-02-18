const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const beautifyUnique = require('mongoose-beautiful-unique-validation');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: "Username already exists.",
        required: 'Username is required.',
        minlength: [3, 'Username must be at least 3 characters long.'],
        maxlength: [13, 'Username can\'t exceed 13 characters.']
    },
    password: {
        type: String,
        required: 'Password is required.',
        minlength: [7, 'Password must be at least 7 characters long.']
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

UserSchema.plugin(beautifyUnique);


UserSchema.virtual('pwdConfirm').set(function (value) {
    const user = this;
    if (user.password !== value)
        this.invalidate('pwdConfirm', 'Passwords must match.');
});

UserSchema.pre('save', async function (next) {
    const user = this;
    const User = user.constructor;
    if (user.isModified('username')) {
        try {
            const nameExists = await User.findOne({ username: new RegExp(`^${user.username}$`, 'i') }, { "username": 1 });
            if (nameExists) {
                return next(user.invalidate('username', 'Username already exists.'));
            }
        } catch (err) {
            next(err);
        }
    }
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

module.exports = mongoose.model('user', UserSchema);