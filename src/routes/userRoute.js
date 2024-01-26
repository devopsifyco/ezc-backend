const express = require('express');
const { getAllUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUser)

module.exports = router;