// netlify/functions/get_township_businesses/get_township_businesses.js
const connectDB = require('./db');
const Business = require('./models/Business'); // Ensure this path is correct

exports.handler = async (event, context) => {
  // Connect to the database
  await connectDB();

  // Fetch businesses from the database
  const businesses = await Business.find().exec();

  return {
    statusCode: 200,
    body: JSON.stringify(businesses),
  };
};


