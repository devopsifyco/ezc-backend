const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dotenv = require('dotenv');
dotenv.configDotenv();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email format',
        },
    },
    points: {
        type: Number,
        default: 0,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'sub-admin', 'challenge-owner'],
        default: 'user',
    },
    verification_code: {
        type: String,
        required: false,
    },
    verification_code_expire: {
        type: Date,
        required: false,
    },
    refresh_token: {
        type: String,
        required: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: String,
        enum: ['active', 'block'],
        default: 'active',
    },
    challenges: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Challenge'
        }],
        default: []
    },
    avatar: {
        type: {
            name: { type: String, required: true },
            downloadLink: { type: String, required: true }
        },
        default: {
            name: process.env.AVATAR_DEFAULT,
            downloadLink: process.env.AVATAR_DEFAULT
        },
        require: true
    },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
