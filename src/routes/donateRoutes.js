const express = require('express');

const {
    donateToAppByPoints,
    getUserDonationHistory
} = require('../controllers/donateController.js');

const { checkAuthentication } = require('../middlewares/authMiddleware.js');
const router = express.Router();


router
    .post('/donation/donate', checkAuthentication, donateToAppByPoints)
    .get('/donation/history/:email', checkAuthentication, getUserDonationHistory)

module.exports = router