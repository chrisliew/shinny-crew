const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  arena: String,
  address: String,
  startDate: String,
  endDate: String,
  startTime: String,
  endTime: String,
  slots: Number,
  skill: String,
  players: Array
});

module.exports = Game = mongoose.model('games', gameSchema);
