const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    requied: [true, 'First Name is required']
  },
  lastName: { type: String },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },


  password: {
    type: String,
    require: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    // This only works on Create and SAVE!!!
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Confirm password: "{VALUE}" should be the same as password'
    }
  },
  passwordChangedAt: { type: Date },

  role: {
    type: String,
    enum: {
      values: ['user', 'owner'],
      message: 'The user role should be user, owner'
    },
    default: 'user'
  },

  accountStatus: {
    type: String,
    default: 'active',
    enum: ['active', 'blocked'],
    select: false
  }
}, { timestamps: true });


// Bcrypting the password and save it to db
userSchema.pre('save', async function (next) {
  // if password is not modified the return from this method

  console.log('bcrypting password');
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete the confirm password
  this.passwordConfirm = undefined;

  next();

})


// Password updated middleware to add passwordChangedAt property
userSchema.pre('save', function (next) {
  // if the password has not been modified then return from this function
  console.log('password checking middleware')
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  // subtract the password changed at to the past because saving to database is slower than issuing jwt
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Instance method
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}


userSchema.plugin(uniqueValidator, { message: '{PATH} should be unique' });


module.exports = mongoose.model('user', userSchema);
