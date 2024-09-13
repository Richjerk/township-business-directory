const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: String,
  description: String,
  address: String,
  phone: String,
  image: String,
  location: { type: { type: String }, coordinates: [Number] } // GeoJSON
});

module.exports = mongoose.model('Business', BusinessSchema);
