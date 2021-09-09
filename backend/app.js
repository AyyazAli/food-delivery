const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// Development Plugins Import i.e [Logging]
const morgan = require('morgan');

// 1) GLOBAL MIDDLEWARES

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Development Logging
if (process.env.NODE_ENV === 'development') {
    // development configuration will go here
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

// 2) Routes
app.get("/",(req, res, next)=>{
    console.log("Request Successful");
    res.status(200).json({
        message: "Request successful"
    })
})


module.exports = app;
