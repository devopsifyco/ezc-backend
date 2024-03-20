const express = require('express');

const {
    getUserNotification,
    markANotificationAsRead,
    markAllNotificationAsRead
} = require('../controllers/notificationController.js');

const { checkAuthentication } = require('../middlewares/authMiddleware.js');
const router = express.Router();


router
    .post('/notifications', checkAuthentication, getUserNotification);

router
    .post('/notification/read', checkAuthentication, markANotificationAsRead);

router
    .post('/notifications/read', checkAuthentication, markAllNotificationAsRead);


module.exports = router