const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  location: { type: { type: String }, coordinates: [Number] } // GeoJSON for tracking
});

module.exports = mongoose.model('User', UserSchema);
