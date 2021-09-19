const catchAsync = require('./errorController').catchAsync;
const AppError = require('../utils/appError');
const OrderModel = require('../models/orderModel');
const apiFeatures = require('../utils/apiFeatures.js')

exports.createOrder = catchAsync(async (req, res, next) => {
    const { meals, totalPrice, restaurant, count } = req.body;
    console.log(req.body)
    if (req.userData.role !== "user") {
        return next(new AppError('Only user can place an order', 401))
    }

    const newMeal = await OrderModel.create({
        user: req.userData.userId,
        restaurant: restaurant.id,
        meals,
        status: 'placed',
        total: totalPrice,
        count,
        orderHistory: [{ message: `Order Placed By User`, createdAt: Date.now() }]
    })

    res.status(201).json({
        message: 'Order Created Successfully',
        restaurant: newMeal
    })
})

exports.getOrders = catchAsync(async (req, res, next) => {

    const orders = await new apiFeatures(OrderModel.find(),
        {
            user: req.userData.role === "user"
                ? req.userData.userId
                : undefined
        })
        .filter()
        .fieldsLimiting()
        .sort()
        .pagination()
        .query
        .populate('user', 'firstName lastName email')
        .populate('restaurant', 'name')

    res.status(200).json({
        message: 'Fetched Orders successfully',
        data: orders,
        total: orders.length
    });
})

exports.getSingleMeal = catchAsync(async (req, res, next) => {
    const meals = await new apiFeatures(MealsModel.findOne({ _id: req.params.id }))
        .query

    if (!meals) {
        return next(new AppError('No Meal Found'))
    }
    res.status(200).json({
        message: 'Found successfully',
        data: meals
    });
})

exports.updateMeal = catchAsync(async (req, res, next) => {
    // 1) Generate error if the user tries to change the owner
    if (req.body.owner) {
        return next(new AppError('Cannot Change the owner of the Meal', 400))
    }
    // 2) Filter out the unwanted field names
    const filterBody = (({ name, description, price }) => ({ name, description, price }))(req.body);
    const updatedMeal = await MealsModel.findByIdAndUpdate(req.params.id, filterBody, { new: true, runValidators: true });
    res.status(200).json({
        message: 'Meal Updated Successfully',
        meal: updatedMeal
    })
})

exports.deleteMeal = catchAsync(async (req, res, next) => {
    await MealsModel.deleteOne({ _id: req.params.id })
    res.status(200).json({
        message: 'Meal deleted Successfully'
    })
})