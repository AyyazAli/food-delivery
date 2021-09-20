const catchAsync = require('./errorController').catchAsync;
const AppError = require('../utils/appError');
const UserModel = require('../models/userModel');
const apiFeatures = require('../utils/apiFeatures.js')

exports.getUsers = catchAsync(async (req, res, next) => {

    const users = await new apiFeatures(UserModel.find(),
        { role: "user" })
        .filter()
        .fieldsLimiting()
        .sort()
        .pagination()
        .query

    res.status(200).json({
        message: 'Fetched Orders successfully',
        data: users,
        total: users.length
    });
})

exports.updateUser = catchAsync(async (req, res, next) => {

    const { accountStatus } = req.body;
    const user = await UserModel.findByIdAndUpdate(req.params.id, { accountStatus }, { new: true, runValidators: true })
    res.status(200).json({
        message: 'User Status Updated Successfully',
        user
    })
})