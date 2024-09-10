const express = require('express');
const { slotReels } = require('../controllers/slotController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, slotReels);

module.exports = router;
