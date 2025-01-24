const Product = require('../models/Product');
const Category = require('../models/Category');
const ErrorResponse = require('../utils/errorResponse');
const upload = require('../middlewares/uploadMiddleware');

// Create a new product
exports.createProduct = (req, res) => {
    // Use the upload middleware to handle the file upload
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { name, description, price, category, stock } = req.body;

            // Validate category
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(404).json({ message: 'Category not found' });
            }

            // Save product with uploaded image URL
            const product = new Product({
                name,
                description,
                price,
                category,
                stock,
                imageUrl: req.file ? `uploads/${req.file.filename}` : null, // Save the relative file path
            });

            await product.save();
            res.status(201).json({ message: 'Product created successfully', product });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
};
// Get all products with optional search
exports.getProducts = async (req, res, next) => {
    try {
        const { query } = req.query;

        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                ],
            };
        }

        const products = await Product.find(filter);
        res.status(200).json({ products });
    } catch (error) {
        next(error);
    }
};

// Get a product by ID
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(new ErrorResponse('Product not found', 404));

        res.status(200).json({ product });
    } catch (error) {
        next(error);
    }
};

// Update a product
exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) return next(new ErrorResponse('Product not found', 404));

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        next(error);
    }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) return next(new ErrorResponse('Product not found', 404));

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Search products
exports.searchProducts = async (req, res, next) => {
    try {
        const { query } = req.query;

        if (!query) return next(new ErrorResponse('Search query is required', 400));

        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        });

        res.status(200).json({ products });
    } catch (error) {
        next(error);
    }
};