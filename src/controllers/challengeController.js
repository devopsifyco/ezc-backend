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
        const status = req.params.status; 
        const challenges = await ChallengeModel.find({ status: status});
        res.status(200).json(challenges);
        console.log(status);
        console.log(req.body);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports = { getAllChallenge, getChallengeByStatus };