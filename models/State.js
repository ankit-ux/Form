const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: String,
  country: String,
  countryCode: String
});

module.exports = mongoose.model('State', stateSchema);
