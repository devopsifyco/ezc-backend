const express = require('express');

const {
    getUserNotification,
    markANotificationAsRead,
    markAllNotificationAsRead,
    getDetailNotification
} = require('../controllers/notificationController.js');

const { checkAuthentication } = require('../middlewares/authMiddleware.js');
const router = express.Router();


router
    .post('/notifications', checkAuthentication, getUserNotification)
    .get('/notification/:id', checkAuthentication, getDetailNotification);

router
    .post('/notification/read', checkAuthentication, markANotificationAsRead);

router
    .post('/notifications/read', checkAuthentication, markAllNotificationAsRead);


module.exports = router