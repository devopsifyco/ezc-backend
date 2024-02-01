const express = require('express');
const { checkAuthentication } = require('../middlewares/authMiddleware');

const {
    getAllChallenge,
    getChallengeByStatus
} = require('../controllers/challengeController');

const router = express.Router();

// router.get('/challenges', checkAuthentication, getAllChallenge);

router
    .route('/challenges')
    .get(checkAuthentication, getAllChallenge)

router
    .route('/challenge/:status')
    .get(getChallengeByStatus)

module.exports = router