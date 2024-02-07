const ChallengeModel = require('../models/Challenge.model')


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
        const challenges = await ChallengeModel.find({ status: status });
        return res.status(200).json(challenges);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}


const createChallenge = async (req, res) => {
    try {
        const { title, images_path, description, points_reward } = req.body;

        const newChallenge = new ChallengeModel({
            title: title,
            images_path: images_path,
            description: description,
            points_reward: points_reward
        });

        await newChallenge.save();
        return res.status(201).json("Create new challenge successfully");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}


const updateChallenge = async (req, res) => {
    try {
        const { id, title, images_path, description, points_reward } = req.body;


        await ChallengeModel.findOneAndUpdate(
            { _id: id },
            {
                title: title,
                images_path: images_path,
                description: description,
                points_reward: points_reward
            },
            {
                new: true
            }
        );

        return res.status(201).json("Update challenge successfully");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports = { getAllChallenge, getChallengeByStatus, createChallenge, updateChallenge };