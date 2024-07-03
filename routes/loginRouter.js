const express = require('express');
const User = require('../models/loginModel'); // Adjust the path if needed
const jwt = require('jsonwebtoken');

const router = express.Router();

// Login user route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found'); // Add this line
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log('Password does not match'); // Add this line
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.log('Server error:', error); // Add this line
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
