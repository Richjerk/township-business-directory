require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON payloads
app.use(cors()); // Enable CORS

// Retrieve the MongoDB URI from the environment variable or use a fallback URI
const uri = process.env.MONGODB_URI || 'mongodb://localhost/township-businesses';

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Business schema
const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  address: String,
  phone: String,
  image: String
});

// Create a model for the Business schema
const Business = mongoose.model('Business', BusinessSchema);

// Define your API routes

// Get all businesses
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
const { getChatResponse } = require('./chatbot'); // Assuming this is a helper function in chatbot.js

app.post('/api/chat', async (req, res) => {
  try {
    const response = await getChatResponse(req.body.prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Nodemailer Email Route
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email from .env
      pass: process.env.EMAIL_PASS  // Your email password from .env
    }
  });

  const mailOptions = {
    from: email,
    to: 'puseletso55@gmail.com', // Your email to receive messages
    subject: `New Enquiry from ${name}`,
    text: message,
    html: `<p>You have a new enquiry from:</p>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
