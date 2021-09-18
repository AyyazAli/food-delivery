const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
    },
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Meal Name is requried']
    }],
    status: {
        type: String,
        enum: {
            values: ['placed', 'cancelled', 'processing', 'inroute', 'delivered', 'received'],
            message: 'Please choose a correct status'
        },
        required: true
    },
    total: {
        type: Number,
        required: [true, "Total order price is required"]
    },
    count: {
        type: Number,
        required: true
    },
    orderHistory: [{
        message: { type: String },
        createdAt: { type: Date }
    }]
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);