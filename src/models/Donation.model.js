const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    challenge_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    points_donated: Number,
    amount_donated: Number,
    date: Date,
    time: Date,
});

const DonationModel = mongoose.model('Donation', donationSchema);

module.exports = DonationModel;