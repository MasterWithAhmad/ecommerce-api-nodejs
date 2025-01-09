const express = require('express');
const {
    addToCart,
    getCart,
    removeFromCart,
    updateCartItem,
} = require('../controllers/cartController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/', authenticate, addToCart); // Add item to cart
router.get('/', authenticate, getCart); // Get user's cart
router.delete('/:productId', authenticate, removeFromCart); // Remove item from cart
router.put('/', authenticate, updateCartItem); // Update item quantity in cart

module.exports = router;
