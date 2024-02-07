const express = require('express');
const { checkAuthentication } = require('../middlewares/authMiddleware');

const {
    getAllChallenge,
    getChallengeByStatus,
    createChallenge,
    updateChallenge,
    approveChallenge,
    rejectChallenge
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

router
    .route('/challenge/update')
    .post(checkAuthentication, updateChallenge)

router
    .route('/challenge/approve')
    .post(checkAuthentication, approveChallenge)

router
    .route('/challenge/reject')
    .post(checkAuthentication, rejectChallenge)


module.exports = router