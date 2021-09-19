const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel')
const catchAsync = require('../controllers/errorController').catchAsync
const AppError = require('../utils/appError');

module.exports = catchAsync(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { email: decodeToken.email, userId: decodeToken._id, role: decodeToken.role };
    const user = await UserModel.findOne({ _id: decodeToken._id })
    if (user.accountStatus !== 'active') {
      return next(new AppError('Your account has been blocked and you cannot perform this action. Please contact the owner', 401))
    }
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({
      message: "Auth Failed"
    })
  }
})