const express = require('express');

const {
    getAllGifts,
    userExchangeGift,
    userExchangeGiftHistory,
    allOfUserExchangeGiftHistory,
    viewGiftDetail
} = require('../controllers/giftController.js');

const { checkAuthentication } = require('../middlewares/authMiddleware.js');
const router = express.Router();


router
    .get('/gifts', checkAuthentication, getAllGifts)
    .post('/gift/exchange', checkAuthentication, userExchangeGift)
    .get('/gift/:id', checkAuthentication, viewGiftDetail)
    .get('/gift/history/all', checkAuthentication, allOfUserExchangeGiftHistory)
    .get('/gift/history/:email', checkAuthentication, userExchangeGiftHistory)

module.exports = router