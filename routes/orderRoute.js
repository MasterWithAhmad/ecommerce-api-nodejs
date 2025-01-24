const express = require('express');
const {
    placeOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/orderController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/', authenticate, placeOrder); // Place an order
router.get('/', authenticate, getUserOrders); // Get user's orders
router.get('/all', authenticate, authorize('admin'), getAllOrders); // Get all orders (admin only)
router.put('/status', authenticate, authorize('admin'), updateOrderStatus); // Update order status (admin only)

module.exports = router;
