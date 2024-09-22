// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const axios = require('axios'); // Ensure axios is imported to handle external API calls
const { RetrievalQAChain } = require('langchain/chains'); // Assuming you're using LangChain
const { getChatResponse } = require('./chatbot'); // Assuming you have separate chatbot logic

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Added for JSON parsing
app.use(cors());

// Retrieve MongoDB URI and other environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/township-businesses';
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

// Get all businesses
app.get('/api/businesses', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new business
app.post('/api/businesses', async (req, res) => {
  const newBusiness = new Business(req.body);
  try {
    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Chatbot functionality using GPT or RAG
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    // Fetch response from your GPT API or RAG-based setup
    const response = await getChatResponse(prompt); // Custom function or external service
    res.json({ response });
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
});

// Nodemailer Email Route
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: 'puseletso55@gmail.com', // Change this to your recipient email
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
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


