const mongoose = require('mongoose');

const giftExchangeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gift',
        required: true
    },
    redeemed_at: {
        type: Date,
        default: Date.now
    }
});

const GiftExchangeModel = mongoose.model('GiftExchange', giftExchangeSchema);

module.exports = GiftExchangeModel;