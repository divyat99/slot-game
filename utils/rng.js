function calculatePayout(reels) {
  const [reel1, reel2, reel3] = reels;

  if (reel1 === reel2 && reel2 === reel3) {
    if (reel1 === '💰') {
      return 500;
    } else if (reel1 === '7️⃣s') {
      return 100;
    } else if (reel1 === '💎') {
      return 50;
    }
  } else if ((reel1 === '💰' && reel2 === '💰') || (reel1 === '💰' && reel3 === '💰') || (reel2 === '💰' && reel3 === '💰')) {
    return 10;
  }

  return 0;
}

module.exports = { calculatePayout };
