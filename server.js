const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute')
const errorHandler = require('./middlewares/errorMiddleware');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const rateLimiter = require('./middlewares/rateLimiter');



dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute)
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);

app.use(errorHandler);

// Apply rate limiter globally
app.use(rateLimiter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
