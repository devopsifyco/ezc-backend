const express = require('express');
const {
    registerUser,
    getAllUser,
    loginUser,
    requestRefreshToken,
    verifyVerificationCodeMatching,
    getUserByEmail
} = require('../controllers/userController.js');
const { checkAuthentication } = require('../middlewares/authMiddleware');

const router = express.Router();


router
    .get("/users", getAllUser)
    .post('/sign-up', registerUser)
    .post('/login', loginUser)
    .post('/refresh-token', requestRefreshToken)
    .post('/verify-email', verifyVerificationCodeMatching);

router
    .post('/user', checkAuthentication, getUserByEmail);


module.exports = router