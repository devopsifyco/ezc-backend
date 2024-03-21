const express = require('express');

const {
    getAllGifts,
    userExchangeGift
} = require('../controllers/giftController.js');

const { checkAuthentication } = require('../middlewares/authMiddleware.js');
const router = express.Router();


router
    .get('/gifts', checkAuthentication, getAllGifts)
    .post('/gift/exchange', checkAuthentication, userExchangeGift);

module.exports = router