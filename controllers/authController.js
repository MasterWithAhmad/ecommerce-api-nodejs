const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/tokenUtils');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate role (Optional)
        const allowedRoles = ['user', 'admin']; // Accept only predefined roles
        const userRole = role && allowedRoles.includes(role) ? role : 'user';

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered.' });

        // Create a new user
        const user = new User({ name, email, password, role: userRole });
        await user.save();

        res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

        const token = generateToken(user._id, user.role);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Promote a user to admin (Admin Only)
exports.promoteToAdmin = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        user.role = 'admin';
        await user.save();

        res.status(200).json({ message: 'User promoted to admin successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};