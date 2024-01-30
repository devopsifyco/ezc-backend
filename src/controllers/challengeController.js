const ChallengeModel = require('../models/Challenge.model')

// @desc    Get all users
// @route   POST /api/users
// @access  Public
const getAllChallenge = async (req, res) => {
    try {
        const challenges = await ChallengeModel.find();
        res.status(200).json(challenges);
        console.log(challenges);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}


const getChallengeByStatus = async (req, res) => {
    try {
        const type = req.body.type;
        const challenges = await ChallengeModel.filter( chal => chal.status = type);
        res.status(200).json(challenges);
        console.log(type);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports = { getAllChallenge, getChallengeByStatus };