const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['challenge', 'message', 'friend_request', 'other'],
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    read: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const NotificationModel = mongoose.model('Notification', NotificationSchema);

module.exports = NotificationModel;