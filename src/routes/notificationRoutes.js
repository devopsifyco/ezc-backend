const express = require('express');

const {
    getUserNotification,
    getAllNotificationOfUser
} = require('../controllers/notificationController.js');

const { checkAuthentication } = require('../middlewares/authMiddleware.js');
const router = express.Router();


router
    .post('/notifications', checkAuthentication, getUserNotification);

router
    .get('/notifications/:email', checkAuthentication, getAllNotificationOfUser)


module.exports = router