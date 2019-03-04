const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  email: String,
  games: Array
});

module.exports = User = mongoose.model('users', userSchema);
