const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;
const secret = process.env.TOKEN_SECRET;

router.post('/add-user', async (req, res) => {
    try {
        const userReq = req.body.user;
        const { password, ...userDetails } = userReq;
        userDetails.hash = await bcrypt.hash(password, salt)
        const user = new User(userDetails);
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.send(err.message);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { user: userReq } = req.body;
        const user = await User.findOne({ email: userReq.email });
        const { hash, ...userSign } = user.toObject();
        const match = await bcrypt.compare(userReq.password, hash);
        const accessToken = jwt.sign(userSign, process.env.TOKEN_SECRET, {
            expiresIn: "30000s",
        })
        if (match) {
            res.json({ accessToken: accessToken });
        } else {
            res.json({ message: "Invalid Credentials" });
        }
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;