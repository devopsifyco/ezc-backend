const express = require('express');
const {
    registerUser,
    getAllUser,
    loginUser,
    requestRefreshToken,
    verifyVerificationCodeMatching
} = require('../controllers/userController.js');

const router = express.Router();


router.get("/users", getAllUser)
    .post('/sign-up', registerUser)
    .post('/login', loginUser)
    .post('/refresh-token', requestRefreshToken)
    .post('/verify-email', verifyVerificationCodeMatching);



module.exports = router