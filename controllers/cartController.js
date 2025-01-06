const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');

// Add an item to the cart
exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return next(new ErrorResponse('Product not found', 404));
        }

        // Find or create a cart for the user
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the product already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        next(error);
    }
};

// Get the user's cart
exports.getCart = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return next(new ErrorResponse('Cart not found', 404));
        }

        res.status(200).json({ cart });
    } catch (error) {
        next(error);
    }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return next(new ErrorResponse('Cart not found', 404));
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        next(error);
    }
};

// Update item quantity in the cart
exports.updateCartItem = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return next(new ErrorResponse('Cart not found', 404));
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.status(200).json({ message: 'Cart item updated', cart });
        } else {
            return next(new ErrorResponse('Product not found in cart', 404));
        }
    } catch (error) {
        next(error);
    }
};