const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const AchievementModel = mongoose.model('Achievement', achievementSchema);

module.exports = AchievementModel;