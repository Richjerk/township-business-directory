const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Import models
const Business = require('./models/Business');
const User = require('./models/User');

// Routes
app.post('/businesses', async (req, res) => {
  const { name, description, address, phone, image, location } = req.body;
  const newBusiness = new Business({ name, description, address, phone, image, location });
  await newBusiness.save();
  res.json(newBusiness);
});

app.post('/users', async (req, res) => {
  const { username, email, phone, location } = req.body;
  const newUser = new User({ username, email, phone, location });
  await newUser.save();
  res.json(newUser);
});

// Listen to requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
