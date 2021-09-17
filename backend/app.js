const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');

//Import Routs

const userRoutes = require('./routes/userRoutes')
const restaurantRoutes = require('./routes/restaurantRoutes')
const mealRoutes = require('./routes/mealRoutes')
// Development Plugins Import i.e [Logging]
const morgan = require('morgan');

// Error Handling Dependencies
const { errorHandler } = require('./controllers/errorController');
const appError = require('./utils/appError');



// 1) GLOBAL MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


//mongodb connection
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hqtta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true })
  .then(() => {
    console.log("Done: connected to database")
  })
  .catch((err) => {
    console.log(err);
    console.log("connection failed");
  });

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

app.use("/api/user", userRoutes)
app.use("/api/restaurant",restaurantRoutes )
app.use("/api/meal",mealRoutes )


// 3) Error Handeling


// Generate 404 error on from server when the URL not found
app.all('*', (req, res, next) => {
  // generate the new error from the error class
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
})


// Handle errors of application
app.use(errorHandler);

module.exports = app;