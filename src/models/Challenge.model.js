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
        type: [
            {
                name: { type: String, required: true },
                downloadLink: { type: String, required: true }
            }
        ],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    points_reward: {
        type: Number,
        required: true,
        default: 0,
    },
});

const ChallengeModel = mongoose.model('Challenge', challengeSchema);

module.exports = ChallengeModel;