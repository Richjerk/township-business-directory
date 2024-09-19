// netlify/functions/get_township_businesses/models/Business.js
const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  description: String,
  // Add other fields as necessary
});

module.exports = mongoose.model('Business', businessSchema);
