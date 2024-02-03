const express = require('express');
const { checkAuthentication } = require('../middlewares/authMiddleware');

const {
    getAllChallenge,
    getChallengeByStatus,
    createChallenge
} = require('../controllers/challengeController');

const router = express.Router();

router
    .route('/challenges')
    .get(checkAuthentication, getAllChallenge)

router
    .route('/challenge/:status')
    .get(checkAuthentication, getChallengeByStatus)

router
    .route('/challenge/create')
    .post(checkAuthentication, createChallenge)


module.exports = router