const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const ReviewSchema = new mongoose.Schema({
    prodId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'product',
        required: true
    },
    user: {
        type: String,
        trim: true,
        required: 'Username is required.',
        minlength: [3, 'Username must be at least 3 characters long.'],
        maxlength: [13, 'Username can\'t exceed 13 characters.'],
    },
    content: {
        type: String,
        required: "Review can't be empty.",
        maxlength: 255
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

ReviewSchema.plugin(beautifyUnique);

ReviewSchema.index({ prodId: 1, user: 1 }, { name: "one user review per product", unique: true }); // schema level

module.exports = mongoose.model('review', ReviewSchema);