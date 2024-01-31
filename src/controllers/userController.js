const bcrypt = require('bcrypt');
const UserModel = require('../models/User.model.js');

// @desc    Register a new user
// @route   POST /api/sign-up
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        const newUser = new UserModel({
            username,
            password,
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



// @desc    Get all users
// @route   POST /api/users
// @access  Public
const verifyVerificationCodeMatching = async (req, res) => {
    try {
        const { email, code } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(user.verification_code_expire);

        const currentTimestamp = new Date().getTime();

        if (code === user.verification_code) {
            if (currentTimestamp > user.verification_code_expire) {
                console.log('Verification code has expired');
                return res.status(401).json({ error: 'Verification code has expired' });
            } else {
                user.verified = true;
                await user.save();
                console.log('Verification successful');
                return res.status(200).json({ message: 'Verification successful' });
            }
        } else {
            console.log('Invalid verification code');
            return res.status(401).json({ error: 'Invalid verification code' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}


module.exports = { getAllUser, registerUser, verifyVerificationCodeMatching };