const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password, email, phone } = req.body;

  try {
    // Validate input fields
    if (!username || !password || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({ username, password: hashedPassword, email, phone });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
