const bcrypt = require('bcrypt');
const UserModel = require('../models/User.model.js');

// @desc    Register a new user
// @route   POST /api/sign-up
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            email,
            role,
        });
        await newUser.save();
        console.log();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const duplicateKey = Object.keys(error.keyPattern)[0];
            const duplicateValue = error.keyValue[duplicateKey];
            
            res.status(400).json({
                message: `Duplicate key error: The ${duplicateKey} '${duplicateValue}' is already registered.`,
            });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};



// @desc    Get all users
// @route   POST /api/users
// @access  Public
const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
        console.log(users);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports = { getAllUser, registerUser };