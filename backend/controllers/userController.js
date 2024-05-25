const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const allowedKeys = {
  "signup": ['username', 'email', 'password'],
  "edit": ['username', 'password', 'email'],
  "delete": ['email'],
  "login": ['email', 'password'],
};


exports.signupUser = async (req, res) => {
  const receivedKeys = Object.keys(req.body);
  const invalidKeys = receivedKeys.filter((key) => !allowedKeys["signup"].includes(key));

  if (invalidKeys.length > 0) {
    return res.status(400).json({ message: 'Invalid parameters in the request body' });
  }
  
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const user = new User({ username, email, password });
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_KEY, { expiresIn: '1h' });  
    await user.save();

    res.cookie('userAccessToken', token);

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.editUser = async (req, res) => {
  const receivedKeys = Object.keys(req.body);
  const invalidKeys = receivedKeys.filter((key) => !allowedKeys["edit"].includes(key));

  if (invalidKeys.length > 0) {
    return res.status(400).json({ message: 'Invalid parameters in the request body' });
  }
  const { username, password, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    user.username = username;
    user.password = password;
    await user.save();
    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: 'User not found' });
  }
};

exports.deleteUser = async (req, res) => {
  const receivedKeys = Object.keys(req.body);
  const invalidKeys = receivedKeys.filter((key) => !allowedKeys["delete"].includes(key));

  if (invalidKeys.length > 0) {
    return res.status(400).json({ message: 'Invalid parameters in the request body' });
  }
  const { email } = req.body;

  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      throw new Error('User not found');
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.loginUser = async (req, res) => {
  const receivedKeys = Object.keys(req.body);
  const invalidKeys = receivedKeys.filter((key) => !allowedKeys["login"].includes(key));

  if (invalidKeys.length > 0) {
    return res.status(400).json({ message: 'Invalid parameters in the request body' });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_KEY, { expiresIn: '1h' });
    res.cookie('userAccessToken', token);
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: 'Login Failed' });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie('userAccessToken');
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.profile = async(req,res) => {
  try {
    
    if (!req.user) {
      throw new Error('User not found');
    }
    res.json({ message: 'User profile fetched successfully', email: req.user.email, username: req.user.username });
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
}