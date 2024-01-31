const express = require('express');

const { sendVerificationCodeEmail
} = require('../controllers/sendMailController');

const router = express.Router();

router
    .post('/send-verification-code', sendVerificationCodeEmail);

module.exports = router;
