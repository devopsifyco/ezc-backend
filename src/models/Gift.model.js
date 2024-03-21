const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    points_required: {
        type: Number,
        required: true,
    },
    image: {
        type: {
            name: { type: String, required: true },
            downloadLink: { type: String, required: true }
        },
        required: true
    },
});

const GiftModel = mongoose.model('Gift', giftSchema);

module.exports = GiftModel;
