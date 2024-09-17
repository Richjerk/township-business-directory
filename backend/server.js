// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/township-businesses', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const BusinessSchema = new mongoose.Schema({
  name: String,
  description: String,
  address: String,
  phone: String,
  image: String
});

const Business = mongoose.model('Business', BusinessSchema);

app.post('/api/businesses', async (req, res) => {
  const newBusiness = new Business(req.body);
  try {
    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// backend/server.js (add this to your existing server file)
const { getChatResponse } = require('./chatbot');

app.post('/api/chat', async (req, res) => {
  try {
    const response = await getChatResponse(req.body.prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/businesses', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
