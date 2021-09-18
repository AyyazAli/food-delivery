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

    const meals = await new apiFeatures(OrderModel.find(), {
        user: req.userData.role === "user" ? req.userData.userId : undefined
    })
        .filter()
        .fieldsLimiting()
        .sort()
        .pagination()
        .query
        .populate('user')

    console.log(meals)
    // if (meals.length === 0) {
    //     return next(new AppError('No Meals Found', 404))
    // }

    const totalMeals = await OrderModel.countDocuments({}).exec();

    res.status(200).json({
        message: 'Fetched Meals successfully',
        data: meals,
        total: totalMeals
    });
})