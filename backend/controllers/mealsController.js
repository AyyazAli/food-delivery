const catchAsync = require('./errorController').catchAsync;
const AppError = require('../utils/appError');
const MealsModel = require('../models/mealsModel');
const RestaurantModel = require('../models/restaurantModel');
const apiFeatures = require('../utils/apiFeatures.js')

exports.createMeal = catchAsync(async (req, res, next) => {
    const { name, description, price, restaurantId } = req.body;

    if (req.userData.role !== "owner") {
        return next(new AppError('Only Owners can add meals to restaurants', 401))
    }

    const restaurant = await RestaurantModel.findOne({ _id: restaurantId, owner: req.userData.userId })
    if (!restaurant) {
        return next(new AppError('Either Restaurant is not found, or you dont own this restraurant', 401))
    }

    const newMeal = await MealsModel.create({
        owner: req.userData.userId,
        restaurant: restaurantId,
        name,
        description,
        price
    })

    res.status(201).json({
        message: 'Meal Created Successfully',
        restaurant: newMeal
    })
})

exports.getMeals = catchAsync(async (req, res, next) => {
    const meals = await new apiFeatures(MealsModel.find(), req.query)
        .filter()
        .fieldsLimiting()
        .sort()
        .pagination()
        .query

    console.log(meals)
    // if (meals.length === 0) {
    //     return next(new AppError('No Meals Found', 404))
    // }

    const totalMeals = await MealsModel.countDocuments({}).exec();

    res.status(200).json({
        message: 'Fetched Meals successfully',
        data: meals,
        total: totalMeals
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