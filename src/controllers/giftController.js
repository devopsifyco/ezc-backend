const GiftModel = require('../models/Gift.model');

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

module.exports = {
    getAllGifts,
};