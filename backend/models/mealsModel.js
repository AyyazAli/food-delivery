const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Meal Name is requried']
    },
    description: { type: String },
    price: {
        type: Number,
        required: [true, "price is required for a meal"]
    }
}, { timestamps: true });

module.exports = mongoose.model('meal', mealSchema);