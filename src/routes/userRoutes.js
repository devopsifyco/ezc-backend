const express = require('express');
const multer = require('multer');
const {
    registerUser,
    getAllUser,
    loginUser,
    requestRefreshToken,
    verifyVerificationCodeMatching,
    getUserByEmail,
    updateUser,
    loginAdmin,
    leaderboard
} = require('../controllers/userController.js');
const { checkAuthentication } = require('../middlewares/authMiddleware');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router
    .get("/users", checkAuthentication, getAllUser)
    .post('/sign-up', registerUser)
    .post('/login', loginUser)
    .post('/refresh-token', requestRefreshToken)
    .post('/verify-email', verifyVerificationCodeMatching)

router
    .get('/user/:email', checkAuthentication, getUserByEmail);

router
    .post('/admin-login', loginAdmin);

router
    .get('/leaderboard', leaderboard);

router.put('/user/update', upload.single(
    'image'
), checkAuthentication, updateUser);


module.exports = router