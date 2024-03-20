const express = require('express');

const {
    getUserNotification
} = require('../controllers/userController.js');

const { checkAuthentication } = require('../middlewares/authMiddleware.js');
const router = express.Router();


router
    .get('/notification', checkAuthentication, getUserNotification);


module.exports = router