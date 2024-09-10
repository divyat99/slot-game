const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reels: [String],
  payout: { type: Number, default: 0 },
  betAmount:{ type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Slot', slotSchema);
