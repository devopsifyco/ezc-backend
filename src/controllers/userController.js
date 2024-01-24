const express = require('express');
const UserModel = require('../models/User.model');


const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
        console.log(users);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports = { getAllUser };