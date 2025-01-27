const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('YOUR_MONGODB_ATLAS_URI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Twilio Setup
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Send OTP
app.post('/api/send-otp', async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();

  try {
    await client.messages.create({
      body: `Your OTP for ShopSphere login is: ${otp}`,
      from: 'YOUR_TWILIO_PHONE_NUMBER',
      to: phone,
    });

    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Register User
app.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const user = new User({ name, email, phone, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login User
app.post('/api/login', async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});