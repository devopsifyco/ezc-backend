const express = require('express');

const {
    getUserNotification,
    getAllNotificationOfUser,
    markANotificationAsRead,
    markAllNotificationAsRead
} = require('../controllers/notificationController.js');

const { checkAuthentication } = require('../middlewares/authMiddleware.js');
const router = express.Router();


router
    .post('/notifications', checkAuthentication, getUserNotification);

router
    .get('/notifications/:email', checkAuthentication, getAllNotificationOfUser);

router
    .post('/notification/read', checkAuthentication, markANotificationAsRead);

router
    .post('/notifications/read', checkAuthentication, markAllNotificationAsRead);


module.exports = router