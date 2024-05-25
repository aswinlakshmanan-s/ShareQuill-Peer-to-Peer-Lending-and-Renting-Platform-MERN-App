const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: /^[a-zA-Z ]*$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: /^[a-zA-Z0-9._-]+@[a-zA-z]\.com$/,
  },
  password: {
    type: String,
    required: true,
    validate: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
  },
});


userSchema.pre('save', async function (next) {
  const user = this;
  
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
