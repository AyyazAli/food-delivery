const catchAsync = require('./errorController').catchAsync;
const AppError = require('../utils/appError');
const RestaurantModel = require('../models/restaurantModel');
const apiFeatures = require('../utils/apiFeatures.js')

exports.createRestaurant = catchAsync(async (req, res, next) => {
    const { name, description, mealType } = req.body;
    if (req.userData.role !== "owner") {
        return next(new AppError('Only Owners can create a new restaurants', 401))
    }
    const newRestaurant = await RestaurantModel.create({
        owner: req.userData.userId,
        name,
        description,
        mealType
    })

    res.status(201).json({
        message: 'Restaurant Created Successfully',
        restaurant: newRestaurant
    })
})

exports.getRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await new apiFeatures(RestaurantModel.find(), req.query)
        .filter()
        .fieldsLimiting()
        .sort()
        .pagination()
        .query

    if (restaurants.length === 0) {
        return next(new AppError('No Restaurants Found', 404))
    }

    const totalRestaurants = await RestaurantModel.countDocuments({}).exec();

    res.status(200).json({
        message: 'Fetched Restaurants successfully',
        data: restaurants,
        total: totalRestaurants
    });
})

exports.getSingleRestaurant = catchAsync(async (req, res, next) => {
    const restaurants = await new apiFeatures(RestaurantModel.findOne({ _id: req.params.id }))
        .query
    if (!restaurants) {
        return next(new AppError('No Restaurant Found'))
    }
    res.status(200).json({
        message: 'Found successfully',
        data: restaurants
    });
})

exports.updateRestaurant = catchAsync(async (req, res, next) => {
    // 1) Generate error if the user tries to change the owner
    if (req.body.owner) {
        return next(new AppError('Cannot Change the owner of the restaurant', 400))
    }
    // 2) Filter out the unwanted field names
    const filterBody = (({ name, description, mealType }) => ({ name, description, mealType }))(req.body);
    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(req.params.id, filterBody, { new: true, runValidators: true });
    res.status(200).json({
        message: 'Restaurant Updated Successfully',
        restaurant: updatedRestaurant
    })
})

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
    await RestaurantModel.deleteOne({ _id: req.params.id })
    res.status(200).json({
        message: 'Restaurant deleted Successfully'
    })
})