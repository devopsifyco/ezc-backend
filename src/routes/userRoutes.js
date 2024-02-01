const express = require('express');
const {
    registerUser,
    getAllUser,
    loginUser,
    verifyVerificationCodeMatching
} = require('../controllers/userController.js');

const router = express.Router();


router.get("/users", getAllUser)
    .post('/sign-up', registerUser)
    .post('/login', loginUser)
    .post('/verify-email', verifyVerificationCodeMatching);



module.exports = router