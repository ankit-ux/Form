const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: /^[A-Za-z]+$/,
  },
  lastName: {
    type: String,
    required: true,
    match: /^[A-Za-z]+$/,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  country: String,
  state: String,
  city: String,
  gender: String,
  dob: Date,
  age: Number,
});

module.exports = mongoose.model('User', userSchema);


