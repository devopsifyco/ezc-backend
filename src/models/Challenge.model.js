const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    status_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
    title: String,
    description: String,
    points_reward: Number,
});

const ChallengeModel = mongoose.model('Challenge', challengeSchema);

module.exports = ChallengeModel;