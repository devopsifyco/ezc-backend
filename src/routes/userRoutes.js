const express = require('express');
const {
    registerUser,
    getAllUser
} = require('../controllers/userController.js');

const router = express.Router();


router.get("/", getAllUser)
router.post('/sign-up', registerUser);



module.exports = router