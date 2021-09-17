const AppError = require("../utils/appError");

// function wrapper to return the middleware function but with the generated roles array
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userData.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        next();
    }
}
