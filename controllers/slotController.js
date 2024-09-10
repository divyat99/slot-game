const Slot = require('../models/Slot');
const User = require('../models/user');
const { calculatePayout } = require('../utils/rng');

exports.slotReels = async (req, res) => {
  try {
    const { betAmount } = req.body; // Bet amount from the request

    if (!betAmount || betAmount <= 0) {
      return res.status(400).json({ msg: 'Invalid bet amount' });
    }

    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.balance < betAmount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    // Generate random reels
    //reels uses Array.from to create an array with 3 slots.
    //Multiplies the random number by the length of the symbols array. [ 0.654 * 10 = 6.54=>6 index]
    const symbols = ['🍒', '🍋', '🍍', '🍉', '⭐', '💎', '🍊', '🍇', '7️⃣', '💰'];
    const reels = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    console.log(reels); 
    // Calculate payout and multiply by bet amount
    const payout = calculatePayout(reels) * betAmount;

    // Update user's balance (deduct betAmount and add payout)
    user.balance = user.balance - betAmount + payout;
    await user.save();

    // Record the slot result
    const slot = new Slot({ user: req.user.id, reels, payout, betAmount });
    
    // Save the slot data
    await slot.save();
    
    console.log("Slot saved:", { user: req.user.id, reels, payout, betAmount });

    res.json({ reels, payout, balance: user.balance });

  } catch (error) {
    console.error("Error during slot:", error);
    res.status(500).json({ msg: 'Server error' });
  }
};
