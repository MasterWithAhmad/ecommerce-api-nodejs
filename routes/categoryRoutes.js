const express = require('express');
const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/', authenticate, authorize('admin'), createCategory);
router.get('/', getCategories);
router.put('/:id', authenticate, authorize('admin'), updateCategory);
router.delete('/:id', authenticate, authorize('admin'), deleteCategory);

module.exports = router;
