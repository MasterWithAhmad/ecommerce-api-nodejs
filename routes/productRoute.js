const express = require('express');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
} = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const rateLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

// Routes
router.post('/', authenticate, authorize('admin'), upload.single('image'), createProduct); // File upload
router.get('/', rateLimiter, getProducts); // Rate limiting on all product retrievals
router.get('/search', rateLimiter, searchProducts); // Search with rate limiting
router.get('/:id', rateLimiter, getProductById); // Product details with rate limiting
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), updateProduct); // Update with optional file upload
router.delete('/:id', authenticate, authorize('admin'), deleteProduct); // Admin-only delete

module.exports = router;