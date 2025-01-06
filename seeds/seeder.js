const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected for seeding...'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

// Seed data
const categories = [
    { name: 'Electronics' },
    { name: 'Fashion' },
    { name: 'Home Appliances' },
];

const products = [
    {
        name: 'Smartphone',
        description: 'Latest model with advanced features.',
        price: 699.99,
        category: '', // Placeholder, will update later
        stock: 50,
    },
    {
        name: 'Laptop',
        description: 'High-performance laptop for professionals.',
        price: 1299.99,
        category: '', // Placeholder, will update later
        stock: 30,
    },
    {
        name: 'Headphones',
        description: 'Noise-canceling over-ear headphones.',
        price: 199.99,
        category: '', // Placeholder, will update later
        stock: 100,
    },
];

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
    },
    {
        name: 'Regular User',
        email: 'user@example.com',
        password: bcrypt.hashSync('user123', 10),
        role: 'user',
    },
];

// Insert data into the database
const seedDatabase = async () => {
    try {
        // Clear existing data
        await Category.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Insert categories
        const createdCategories = await Category.insertMany(categories);

        // Map category IDs to products
        products.forEach((product, index) => {
            product.category = createdCategories[index % createdCategories.length]._id;
        });

        // Insert products
        await Product.insertMany(products);

        // Insert users
        await User.insertMany(users);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();