// routes/UserRoute.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/UserSchema');

// Route: POST /api/user/signup
// Description: Register a new user
router.post('/signup', async (req, res) => {
  try {
    const { name, password } = req.body;
    const newUser = new User({ name, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route: POST /api/user/login
// Description: User login
router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(400).json({ message: 'Cannot find user' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
