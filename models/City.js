const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: String,
  state: String,
  stateCode: String,
  country: String,
  countryCode: String
});

module.exports = mongoose.model('City', citySchema);
