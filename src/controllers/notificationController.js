const NotificationModel = require('../models/Notification.model');
const UserModel = require('../models/User.model');

const getUserNotification = async (req, res) => {
    try {
        const { email } = req.body;
        const user = UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json("Get user nofitication error: User not found");
        }
        const userId = user._id;
        const notifications = await NotificationModel.find({ user_id: userId });
        return res.status(200).json(notifications);
    } catch (error) {
        console.error("Error while getting user notifications:", error);
        return res.status(500).json("Internal server error");
    }
};


module.exports = {
    getUserNotification
};