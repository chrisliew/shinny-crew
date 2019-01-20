const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  displayName: String
});

module.exports = User = mongoose.model('users', userSchema);
