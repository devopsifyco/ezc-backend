const express = require('express');

const {
    donateToAppByPoints,
} = require('../controllers/donateController.js');

const { checkAuthentication } = require('../middlewares/authMiddleware.js');
const router = express.Router();


router
    .post('/donation/donate', checkAuthentication, donateToAppByPoints)

module.exports = router