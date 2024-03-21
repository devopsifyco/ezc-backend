const GiftModel = require('../models/Gift.model');
const UserModel = require('../models/User.model');
const GiftExchangeModel = require('../models/GiftExchange.model');
const NotificationModel = require('../models/Notification.model');

const getAllGifts = async (req, res) => {
    try {
        const gifts = await GiftModel.find();
        if (gifts.length === 0) {
            return res.status(404).json("No gift right now");
        }
        return res.status(200).json(gifts);
    } catch (error) {
        console.error("Error while getting gift:", error);
        return res.status(500).json("Internal server error");
    }
};

const userExchangeGift = async (req, res) => {
    try {
        const { email, gift_id } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json("User not found");
        }

        const gift = await GiftModel.findById(gift_id);
        if (!gift) {
            return res.status(404).json("Gift not found");
        }
        if (gift.quantity <= 0) {
            return res.status(400).json("Gift out of stock");
        }
        if (user.points < gift.points_required) {
            return res.status(400).json("Insufficient points to redeem the gift");
        }
        const giftExchange = new GiftExchangeModel({
            user: user._id,
            gift: gift_id
        });
        user.points -= gift.points_required;
        gift.quantity--;
        await giftExchange.save();
        await gift.save();
        await user.save();

        const notification = new NotificationModel({
            user_id: user._id,
            message: `You have successfully exchanged a gift: ${gift.name}`,
            type: 'gift_exchange'
        });
        await notification.save();

        return res.status(200).json("Gift exchanged successfully");
    } catch (error) {
        console.error("Error while exchanging gift:", error);
        return res.status(500).json("Internal server error");
    }
};

const userExchangeGiftHistory = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await UserModel.findOne({ email: email })
        if (!user) {
            return res.status(404).json("User not found");
        }

        const history = await GiftExchangeModel.find({ user: user._id })
            .populate({
                path: 'user',
                select: '-password -points -role -verified -is_active -challenges -__v -verification_code -verification_code_expire -refresh_token'
            })
            .populate({
                path: 'gift',
                select: ''
            })
        return res.status(200).json(history);
    } catch (error) {
        console.error("Error while exchanging gift:", error);
        return res.status(500).json("Internal server error");
    }
};

const viewGiftDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const gift = await GiftModel.findById(id)
        if (!gift) {
            return res.status(404).json("Gift not found");
        }

        return res.status(200).json(gift);
    } catch (error) {
        console.error("Error while view detail gift:", error);
        return res.status(500).json("Internal server error");
    }
};

module.exports = {
    getAllGifts,
    userExchangeGift,
    userExchangeGiftHistory,
    viewGiftDetail
};