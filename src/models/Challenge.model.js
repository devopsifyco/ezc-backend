const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    owner_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'finished'],
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
    address: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: false,
    },
    points_reward: {
        type: Number,
        required: true,
        default: 0,
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    participants: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        is_checkin: { type: Boolean, default: false }
    }]
});

const ChallengeModel = mongoose.model('Challenge', challengeSchema);

module.exports = ChallengeModel;
