const express = require('express');

const {
    getAllGifts,
} = require('../controllers/giftController.js');

const { checkAuthentication } = require('../middlewares/authMiddleware.js');
const router = express.Router();


router
    .get('/gifts', checkAuthentication, getAllGifts);

module.exports = router