const express = require('express');

const {
    getAllChallenge,
    getChallengeByStatus
} = require('../controllers/challengeController');

const router = express.Router();

router
    .route('/challenges')
    .get(getAllChallenge)

router
    .route('/challenge/:status')
    .get(getChallengeByStatus)

module.exports = router