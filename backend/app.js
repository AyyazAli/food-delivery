const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

// Development Plugins Import i.e [Logging]
const morgan = require('morgan');

// Error Handling Dependencies
const { errorHandler } = require('./controller/errorController');
const appError = require('./utils/appError');

// 1) GLOBAL MIDDLEWARES


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS Functionality
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});


app.use("/public", express.static(path.join(__dirname, 'public')));

// 2) Routes


// 3) Error Handeling


// Generate 404 error on from server when the URL not found
app.all('*', (req, res, next) => {
  // generate the new error from the error class
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
})


// Handle errors of application
app.use(errorHandler);

module.exports = app;