const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');

// Place an order
exports.placeOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Get the user's cart
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return next(new ErrorResponse('Your cart is empty', 400));
        }

        // Calculate total price and validate stock
        let totalPrice = 0;
        for (const item of cart.items) {
            if (item.quantity > item.product.stock) {
                return next(new ErrorResponse(`Insufficient stock for ${item.product.name}, 400`));
            }
            totalPrice += item.quantity * item.product.price;
        }

        // Create the order
        const order = new Order({
            user: userId,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            totalPrice,
        });
        await order.save();

        // Update product stock
        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);
            product.stock -= item.quantity;
            await product.save();
        }

        // Clear the cart
        cart.items = [];
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        next(error);
    }
};

// Get user orders
exports.getUserOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).populate('items.product');
        res.status(200).json({ orders });
    } catch (error) {
        next(error);
    }
};

// Get all orders (Admin Only)
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('items.product').populate('user');
        res.status(200).json({ orders });
    } catch (error) {
        next(error);
    }
};

// Update order status (Admin Only)
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { orderId, status } = req.body;

        const allowedStatuses = ['pending', 'shipped', 'completed', 'canceled'];
        if (!allowedStatuses.includes(status)) {
            return next(new ErrorResponse('Invalid status', 400));
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return next(new ErrorResponse('Order not found', 404));
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        next(error);
    }
};
