const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  arena: String,
  address: String,
  price: Number,
  startDate: String,
  endDate: String,
  startTime: String,
  endTime: String,
  forwardSlots: Number,
  defenseSlots: Number,
  goalieSlots: Number,
  skill: String,
  players: Array
});

module.exports = Game = mongoose.model('games', gameSchema);
