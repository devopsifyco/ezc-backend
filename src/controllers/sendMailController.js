// Generate the transporter
const nodemailer = require("nodemailer");
const UserModel = require('../models/User.model');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const sendVerificationMail = async (userEmail, token) => {
    try {
        const mailOptions = {
            from: 'thaihoang20112k3@gmail.com',
            to: userEmail,
            subject: 'Verification Code',
            text: `${token}`,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info);
        return token;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const generateVerificationToken = () => {
    const min = 1000;
    const max = 9999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum.toString();
};


const sendVerificationCodeEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        const verificationToken = generateVerificationToken();
        const now = new Date();
        const verificationTokenExpire = new Date(now.getTime() + 1 * 60000);

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: user._id },
            {
                $set: {
                    verification_code: verificationToken,
                    verification_code_expire: verificationTokenExpire,
                },
            },
            { new: true }
        );

        await sendVerificationMail(email, verificationToken);

        console.log('User after update:', updatedUser);

        res.status(200).json({ message: `Verification code email sent successfully for token: ${verificationToken}` });
    } catch (error) {
        console.error('Error sending verification code email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = { sendVerificationCodeEmail };