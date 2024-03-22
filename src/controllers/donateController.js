const DonationModel = require('../models/Donation.model');
const UserModel = require('../models/User.model');
const NotificationModel = require('../models/Notification.model');

const donateToAppByPoints = async (req, res) => {
    try {
        const { email, message, points } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json("User not found");
        }
        const userId = user._id;

        if (user.points < points) {
            return res.status(400).json("Sorry, your points are not enough for this donation");
        }

        const donation = new DonationModel({
            user: userId,
            message: message,
            points_donated: points
        })
        donation.save();

        user.points -= points;
        await user.save();

        const notification = new NotificationModel({
            user_id: userId,
            message: `Thank you for your donation of ${points} points to the app! Your support is greatly appreciated.`,
            type: 'donation'
        });
        await notification.save();

        return res.status(200).json("Donation successful");
    } catch (error) {
        console.error("Error while getting gift:", error);
        return res.status(500).json("Internal server error");
    }
};

const getUserDonationHistory = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json("User not found");
        }
        const userId = user._id;

        const history = await DonationModel.find({ user: userId })

        return res.status(200).json(history);
    } catch (error) {
        console.error("Error while user donation history:", error);
        return res.status(500).json("Internal server error");
    }
};

module.exports = {
    donateToAppByPoints,
    getUserDonationHistory
};