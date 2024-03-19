const express = require('express');
const { checkAuthentication } = require('../middlewares/authMiddleware');
const multer = require('multer');
const {
    getAllChallenge,
    getAChallenge,
    getChallengeByStatus,
    createChallenge,
    updateChallenge,
    approveChallenge,
    rejectChallenge,
    deleteChallenge,
    joinChallenge,
    getAllChallengesUserNotJoinYet,
    checkInController,
    getParticipantsOfAChallenge,
    confirmFinishChallenge,
    getOneChallengeByStatusApproved,
    challengeThatUseHasJoined,
    getMyOwnChallenge
} = require('../controllers/challengeController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router
    .route('/challenges')
    .get(checkAuthentication, getAllChallenge)

router
    .route('/challenges/not-participate')
    .post(checkAuthentication, getAllChallengesUserNotJoinYet)

router
    .route('/challenges/joined')
    .post(checkAuthentication, challengeThatUseHasJoined)

router
    .route('/challenge/participants/:id')
    .get(checkAuthentication, getParticipantsOfAChallenge)

router
    .route('/challenge/:id')
    .get(checkAuthentication, getAChallenge)

router
    .route('/challenge/status/:status')
    .get(checkAuthentication, getChallengeByStatus)

router.post('/challenge/create', upload.single('image'), checkAuthentication, createChallenge);

router.put('/challenge/update', upload.single('image'), checkAuthentication, updateChallenge);

router
    .route('/challenge/approve')
    .post(checkAuthentication, approveChallenge)

router
    .route('/challenge/reject')
    .post(checkAuthentication, rejectChallenge)

router
    .route('/challenge/delete')
    .delete(checkAuthentication, deleteChallenge)

router
    .route('/challenge/join')
    .post(checkAuthentication, joinChallenge)

router
    .route('/challenge/check-in')
    .post(checkAuthentication, checkInController)

router
    .route('/challenge/complete')
    .post(checkAuthentication, confirmFinishChallenge)

router
    .route('/challenge/status/approved/:id')
    .get(checkAuthentication, getOneChallengeByStatusApproved)

router
    .route('/challenge/my-challenge')
    .post(checkAuthentication, getMyOwnChallenge)


module.exports = router
