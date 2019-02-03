const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  games: Array
});

module.exports = User = mongoose.model('users', userSchema);
