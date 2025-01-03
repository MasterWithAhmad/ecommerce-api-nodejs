const express = require('express');
const { register, login, promoteToAdmin } = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/register', register);
router.post('/login', login);
router.put('/promote', authenticate, authorize('admin'), promoteToAdmin);

module.exports = router;