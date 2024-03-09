const ChallengeModel = require('../models/Challenge.model');
const UserModel = require('../models/User.model');
const firebaseConfig = require('../config/firebase/firebase');
const firebaseApp = require('firebase/app');
const firebaseStorage = require('firebase/storage');
const mongoose = require('mongoose');

firebaseApp.initializeApp(firebaseConfig.firebaseConfig)
const storage = firebaseStorage.getStorage();

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

const getAChallenge = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json("Missing challenge id");
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid challenge ID");
        }

        const challenge = await ChallengeModel.findOne({ _id: id })
                .populate("owner_id")
                .populate("participants")

        if (!challenge) {
            return res.status(404).json("Challenge not found");
        }

        return res.status(200).json(challenge);
    }
    catch (error) {
        console.log("Get a challenge error: ", error);
        return res.status(500).send("Internal server error", error);
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
        const { title, description, points_reward, address, company, start_time, end_time, email } = req.body;
        const imageFiles = req.body.image;

        if (!imageFiles || !Array.isArray(imageFiles)) {
            return res.status(400).json({
                error: 'No files uploaded or files are not in the correct format.'
            });
        }

        const metadata = {
            contentType: 'image/jpg'
        }

        const imagesData = [];

        for (const imageFile of imageFiles) {
            const storageRefImage = firebaseStorage.ref(storage, `/images/${imageFile.fileName}`);
            const buffer = new Buffer.from(imageFile.base64, 'base64');
            const snapshotFilename = await firebaseStorage.uploadBytesResumable(storageRefImage, buffer, metadata);
            const downloadURL = await firebaseStorage.getDownloadURL(snapshotFilename.ref);

            imagesData.push({
                name: imageFile.fileName,
                downloadLink: downloadURL
            });
        }
        const user = await UserModel.findOne({ email: email });
        const ownerId = user._id

        const newChallenge = new ChallengeModel({
            owner_id: ownerId,
            title: title,
            images_path: imagesData,
            description: description,
            points_reward: points_reward,
            address: address,
            company: company,
            start_time: start_time,
            end_time: end_time,
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
        const { id, title, images_path, description, points_reward, address, company, start_time, end_time } = req.body;
        console.log(req.body);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid challenge ID");
        }

        const updatedData = {
            title,
            images_path,
            description,
            points_reward,
            address,
            company,
            start_time,
            end_time,
        };

        const updatedChallenge = await ChallengeModel.findOneAndUpdate(
            { _id: id },
            updatedData,
            { new: true }
        );

        if (!updatedChallenge) {
            return res.status(404).json("Challenge not found");
        }
        return res.status(200).json("Challenge updated successfully");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}


const approveChallenge = async (req, res) => {
    try {
        const { id } = req.body;

        const challenge = await ChallengeModel.findById({ _id: id })

        if (!challenge) {
            return res.status(404).json('Cannot find this challenge');
        }

        if (challenge.status === 'approved') {
            return res.status(404).json('This challenge was approved');
        } else if (challenge.status === 'rejected') {
            return res.status(404).json('This challenge was rejected');
        } else {
            await ChallengeModel.findOneAndUpdate(
                { _id: id },
                {
                    status: "approved"
                }
            );
        }

        return res.status(201).json("Approve the challenge successfully");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}


const rejectChallenge = async (req, res) => {
    try {
        const { id } = req.body;

        const challenge = await ChallengeModel.findById({ _id: id })

        if (!challenge) {
            return res.status(404).json('Cannot find this challenge');
        }

        if (challenge.status === 'approved') {
            return res.status(404).json('This challenge was approved');
        } else if (challenge.status === 'rejected') {
            return res.status(404).json('This challenge was rejected');
        } else {
            await ChallengeModel.findOneAndUpdate(
                { _id: id },
                {
                    status: "rejected"
                }
            );
        }

        return res.status(201).json("Reject the challenge successfully");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}


const deleteChallenge = async (req, res) => {
    try {
        const { id } = req.body;

        const challenge = await ChallengeModel.findById({ _id: id })

        if (!challenge) {
            return res.status(404).json('Cannot find this challenge');
        }

        await ChallengeModel.deleteOne({ _id: id });

        return res.status(201).json("Delete the challenge successfully");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

const joinChallenge = async (req, res) => {
    try {

        const { email, id } = req.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const challenge = await ChallengeModel.findById(id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        if (challenge.participants.includes(user._id)) {
            return res.status(400).json({ message: 'User is already a participant in this challenge' });
        }
        challenge.participants.push(user._id);
        await challenge.save();
        return res.status(200).json({ message: 'User successfully joined the challenge' });

        
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }

}


module.exports = { getAllChallenge, getChallengeByStatus, getAChallenge, createChallenge, updateChallenge, approveChallenge, rejectChallenge, deleteChallenge, joinChallenge };
