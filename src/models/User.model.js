const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    points: { type: Number, default: 0 },
    role: String,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;