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
    deleteChallenge
} = require('../controllers/challengeController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router
    .route('/challenges')
    .get(checkAuthentication, getAllChallenge)

router
    .route('/challenge/:id')
    .get(checkAuthentication, getAChallenge)

router
    .route('/challenge/status/:status')
    .get(checkAuthentication, getChallengeByStatus)

router.post('/challenge/create', upload.fields([
    {
        name: 'image'
    },
]), checkAuthentication, createChallenge);

router.update('/challenge/update', upload.fields([
    {
        name: 'image'
    },
]), checkAuthentication, updateChallenge);

router
    .route('/challenge/approve')
    .post(checkAuthentication, approveChallenge)

router
    .route('/challenge/reject')
    .post(checkAuthentication, rejectChallenge)

router
    .route('/challenge/delete')
    .delete(checkAuthentication, deleteChallenge)


module.exports = router
