const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        requied: [true, 'Restraunt Name is Required']
    },
    description: { type: String },
    mealType: {
        type: String,
        enum:{
            values: ['seaFood', 'chineese', 'fastFood'],
            message: `The restaurant can only offer 'seaFood', 'chineese', 'fastFood'`
        },
        required: [true, "Restraunt should specify the type of meal its offer"]
    }
}, { timestamps: true });

module.exports = mongoose.model('restaurant', userSchema);