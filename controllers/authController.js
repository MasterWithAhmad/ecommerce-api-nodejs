const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/tokenUtils');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered.' });

        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully.' });
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
