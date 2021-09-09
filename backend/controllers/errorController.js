const AppError = require('../utils/appError');



const sendErrorDev = (err, res) => {
  console.log(err);
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    console.log(err);
    // Operational errors are our trusted errors and can be send to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })

        // Non operational errors are not be sent to client so that's why we send generic errors
    } else {
        // 1) Log the error to the file
        console.error('error', err);

        // 2) send generic response
        res.status(500).json({
            status: 'error',
            message: 'Something really bad happened',
        })
    }
}

// This way of writing function is built in latest version and this will generate and return the value by itself
const handleJWTError = err => new AppError(`Invalid Token Please login again`, 401);

const handleJWTExpiredError = () => new AppError(`Your token has been expired, Please login again`, 401);

 const handleCastErrorDB = () => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400)
}


const handleDuplicateFieldsDB = err => {
    name = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
    const message = `Duplicate Fields are not allowed -- ${name[0]} -- Use different value`;
    return new AppError(message, 400);
}


const handleValidationErrorDB = err => {

    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid Input Data ${errors.join('. ')}`
    return new AppError(message, 400);
}


// Handles all errors generated by application
exports.errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        // Create copy of error object
        let error = { ...err }
        // Invalid field error will be handled here and this will be converted to operational error
        if (error.name === 'CastError') error = handleCastErrorDB(error);

        // This will handle duplicate error
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);

        // This will handle validation errors and will mark these errors as operational
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

        // This will handle invalid json web token
        if (error.name === 'JsonWebTokenError') error = handleJWTError();

        // IF the token has been expired
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
        // Handle all production error
        sendErrorProd(error, res);
    }
}

exports.catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}
