const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Register Token:', token); // Log the token
    res.json({ token, user });
  } catch (err) {
    console.error('Register Error:', err); // Log errors
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login Token:', token); // Log the token
    res.json({ token, user });
  } catch (err) {
    console.error('Login Error:', err); // Log errors
    res.status(500).send('Server Error');
  }
};
