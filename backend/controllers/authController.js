const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('./errorController').catchAsync;
const AppError = require('../utils/appError');
const { Role } = require('../utils/constants');


const createUser = async (data) => {

  const user = new User({ ...data });

  //saving user data in database
  const result = await user.save();

  return result;
}

//Adding User
exports.createUser = catchAsync(async (req, res, next) => {

  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role
  }
  const user = await createUser(data)

  // create the token and send the response to the user
  try {
    createSendToken(user, 201, res);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: 500
    })
  }
});

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const expiresIn = process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000;


  // delete the password from the output
  user.password = undefined;
  user.active = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    expiresIn,
    data: {
      user
    }
  })
}


exports.login = catchAsync(async (req, res, next) => {

  // fetch email and password from the body and save their value in the variables
  const { email, password } = req.body;

  // 1) Check if the email and password exist

  if (!email || !password) {
    // generate error that will be catched in our error handler
    return next(new AppError('Please Enter email and password', 400))
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password'); // this + sign is used when we want to select a field that is originally excluded from mongoose select in model

  if (!user) {
    return next(new AppError('Email does not exist', 404));
  }
  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError('Email or Password is incorrect', 401));
  }
  // 3) if everything is ok, send token to client

  // Create the jwt token and send the response back to user
  createSendToken(user, 200, res);
})

exports.protect = catchAsync(async (req, res, next) => {

  let token;

  // 1) Getting token and check if token exists
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please login to get access', 401));
  }

  // 2) Validate the verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWt_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError('The user you are trying to login does not exist', 401));

  // 4) Check if user changed password after the JWT token was issued
  if (currentUser.passwordChangeAfter(decoded.iat)) {
    return next(new AppError('The password has been changed after the user logged in and you are not authorized anymore', 401));
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
})


// function wrapper to return the middleware function but with the generated roles array
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403))
    }
    next();
  }
}