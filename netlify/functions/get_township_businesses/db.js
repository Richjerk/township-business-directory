// db.js
const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://atlas-sql-65edfbe73d7aff59625ae3b6-3q47b.a.query.mongodb.net/myVirtualDatabase?ssl=true&authSource=admin';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;