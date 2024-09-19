require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS and body-parser middleware
app.use(cors());
app.use(bodyParser.json());

// Retrieve the MongoDB URI from the environment variable
const uri = process.env.MONGODB_URI || 'mongodb://localhost/township-businesses'; // Replace with your fallback URI

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Business schema
const BusinessSchema = new mongoose.Schema({
  name: String,
  description: String,
  address: String,
  phone: String,
  image: String
});

// Create a model for the Business schema
const Business = mongoose.model('Business', BusinessSchema);

// Define your API routes here
app.get('/api/businesses', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST route to create a new business
app.post('/api/businesses', async (req, res) => {
  const newBusiness = new Business(req.body);
  try {
    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Include chatbot functionality
const { getChatResponse } = require('./chatbot');

app.post('/api/chat', async (req, res) => {
  try {
    const response = await getChatResponse(req.body.prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
