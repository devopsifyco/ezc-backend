const bcrypt = require('bcrypt');
const UserModel = require('../models/User.model.js');
const helpers = require('../helpers/jwt.js');
const jwt = require('jsonwebtoken')


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


// @desc    Login as a user
// @route   POST /api/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { password, email } = req.body;
        console.log("aksdfh1");

        const user = await UserModel.findOne({
            email: email
        });
        console.log("aksdfh2");

        if (user == null) {
            return res.status(404).json({
                message: "Account is not registered"
            });
        }
        console.log("aksdfh3");

        if (user.is_active != "active") {
            return res.status(400).json({
                message: "The account has been deleted. Please contact email: it.trungdang@gmail.com. We will handle it for you."
            });
        }
        console.log("aksdfh4");

        if (!user) {
            return res.status(404).json({
                message: "Username is incorrect"
            });
        }
        console.log("aksdfh5");

        const validPassword = await bcrypt.compare(password, user.password)
        try {
            console.log('5 oke');
        }
        catch (error) {
            console.log('5 eerrror:', error);

        };

        console.log("aksdfh6");

        if (!validPassword) {
            return res.status(404).json({
                message: "Password is incorrect"
            });
        }
        console.log("aksdfh7");

        if (user && validPassword) {
            console.log("aksdfh8");

            const accessToken = helpers.generateAccessToken(user);
            const refreshToken = helpers.generateRefreshToken(user);
            console.log("aksdfh9");

            const updatedUser = await UserModel.findOneAndUpdate({
                email: email
            }, {
                refresh_token: refreshToken
            }, {
                new: true
            });
            console.log("aksdf10");

            await res.cookie("refreshtoken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/'
            });
            console.log("aksdfh11");

            await res.cookie("accesstoken", accessToken, {
                secure: false,
                path: '/'
            });
            console.log("aksdfh12");

            const {
                password,
                refresh_token,
                ...others
            } = user._doc;
            console.log("aksdfh13");


            return res.status(200).json({
                message: "Login successfully",
                refreshToken: refreshToken,
                accessToken: accessToken
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};



const requestRefreshToken = async (req, res) => {
    const { refreshToken, email } = req.body;
    console.log(refreshToken);
    if (!refreshToken) return res.status(401).json("You are not authenticated")

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) console.log(err);
        const userDb = await UserModel.find({ email: email });
        if (!userDb) {
            return res.status(401).json("User not found");
        }
        const newAccessToken = helpers.generateAccessToken(userDb)
        const newRefreshToken = helpers.generateRefreshToken(userDb);

        const updateRefreshToken = await UserModel.findOneAndUpdate({
            _id: user.userId
        }, {
            $set: {
                refresh_token: newRefreshToken
            }
        }, {
            new: true
        });
        res.cookie("refreshtoken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict"
        });
        res.cookie('accesstoken', newAccessToken, {
            secure: false,
            path: "/",
            sameSite: "strict"
        })

        res.status(200).json({
            accessToken: newAccessToken
        });
    })
}



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
const getUserByEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found")
        }
        res.status(200).json(user);
        console.log(user);
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


module.exports = { getAllUser, registerUser, verifyVerificationCodeMatching, loginUser, requestRefreshToken, getUserByEmail };