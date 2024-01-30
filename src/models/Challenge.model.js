const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    title: {
        type: String,
        required: true,
    },
    images_path: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    points_reward: {
        type: Number,
        required: true,
    },
});

const ChallengeModel = mongoose.model('Challenge', challengeSchema);

module.exports = ChallengeModel;