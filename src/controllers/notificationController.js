const NotificationModel = require('../models/Notification.model');
const UserModel = require('../models/User.model');

const getUserNotification = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json("Get user nofitication error: User not found");
        }
        const userId = user._id;
        const notifications = await NotificationModel.find({ user_id: userId }).populate({
            path: 'user_id',
            select: '-password -points -role -verified -is_active -challenges -__v -verification_code -verification_code_expire -refresh_token'
        });
        return res.status(200).json(notifications);
    } catch (error) {
        console.error("Error while getting user notifications:", error);
        return res.status(500).json("Internal server error");
    }
};

const getAllNotificationOfUser = async(req, res) => {
    try {
        const {email} = req.params;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json("Get user notification error: User not found");
        }
        const userId = user._id;
        const notifications = await NotificationModel.find({ user_id: userId }).populate({
            path: 'user_id',
            select: '-password -points -role -verified -is_active -challenges -__v -verification_code -verification_code_expire -refresh_token'
        });
        return res.status(200).json(notifications);
    } catch (error) {
        console.error("Error while getting user notifications:", error);
        return res.status(500).json("Internal server error");
    }
}
const markANotificationAsRead = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(404).json("Notification not found");
        }

        const notifications = await NotificationModel.findByIdAndUpdate(id, { read: true });
        if (!notifications) {
            return res.status(404).json("Get user nofitication error: User not found");
        }

        return res.status(201).json("Update notification successfull");
    } catch (error) {
        console.error("Error while getting user notifications:", error);
        return res.status(500).json("Internal server error");
    }
};

const markAllNotificationAsRead = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json("Get user nofitication error: User not found");
        }

        const userId = user._id;
        await NotificationModel.updateMany({ user_id: userId }, { read: true })
        return res.status(201).json("Update all notification successfull");
    } catch (error) {
        console.error("Error while getting user notifications:", error);
        return res.status(500).json("Internal server error");
    }
};


module.exports = {
    getUserNotification,
    getAllNotificationOfUser,
    markANotificationAsRead,
    markAllNotificationAsRead
};