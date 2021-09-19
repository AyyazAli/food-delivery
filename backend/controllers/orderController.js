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
        orderHistory: [{ message: `Order Placed By User`, date: Date.now() }]
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

exports.getSingleOrder = catchAsync(async (req, res, next) => {
    const order = await new apiFeatures(OrderModel.findOne({ _id: req.params.id }))
        .query
        .populate('user', 'firstName lastName email')
        .populate('restaurant', 'name')
        .populate('meals')

    if (!order) {
        return next(new AppError('No Order Found'))
    }
    res.status(200).json({
        message: 'Order found successfully',
        data: order
    });
})


const statuses = [
    { value: 'placed', priority: 1 },
    { value: 'processing', priority: 3 },
    { value: 'inroute', priority: 4 },
    { value: 'delivered', priority: 5 },
    { value: 'received', priority: 6 },
    { value: 'cancelled', priority: 10 }
]

exports.updateOrderStatus = catchAsync(async (req, res, next) => {

    // 2) Filter out the unwanted field names
    const { status } = req.body;
    const orderId = req.params.id;

    const order = await OrderModel.findOne({ _id: orderId });

    if (!order){
        return next(new AppError('Order not found', 404))
    }
    const currentStatus = order.status;

    const currentPriority = statuses.find(s => s.value === currentStatus)
    const newPriority = statuses.find(s => s.value === status)

    if (req.userData.role === 'owner') {
        if (status === 'received' || status === 'cancelled') {
            return next(new AppError('Only Users can cancel or recieve an order'), 401)
        }
        if (currentStatus === 'cancelled') {
            return next(new AppError('You cannot prepare or deliver an order that has been cancelled by the user', 400))
        }

        if (newPriority < currentPriority ){
            return next (new AppError('You cannot go back to the previous order Status'))
        }
    } else if (req.userData.role === 'user') {
        if (status === 'processing' || status === 'inroute' || status === 'delivered') {
            return next(new AppError('Only Owners can process or deliver the order'))
        }

        if (status === 'cancelled' && currentStatus!== 'placed'){
            return next (new AppError('you cannot cancel the order now', 400))
        }

        if (status === 'received' && currentStatus !== 'delivered') {
            return next(new AppError('You cannot received an order that is not been deliverd yet', 400))
        }
    }

    order.status = status;
    order.orderHistory.push({
        message: `Order Status updated to ${status} by ${req.userData.role}`,
        date: Date.now()
    })
    const updatedOrder = await order.save()

    res.status(200).json({
        message: 'Meal Updated Successfully',
        order: updatedOrder
    })
})

exports.deleteMeal = catchAsync(async (req, res, next) => {
    await MealsModel.deleteOne({ _id: req.params.id })
    res.status(200).json({
        message: 'Meal deleted Successfully'
    })
})