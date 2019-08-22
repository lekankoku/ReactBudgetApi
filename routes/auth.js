const { User } = require("../models/user");
const {
    validateNewUser,
    validateOldUser,
    hashPassword
} = require("../helpers/user-helper");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
    const { error } = validateOldUser(req.body);
    let { email, password } = req.body;
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        if (!user) return res.status(400).send("Invalid email or password");
    }
    const token = user.generateAuthToken();
    res.send(token);
});

router.post("/create", async (req, res) => {
    const { error } = validateNewUser(req.body);
    let { email, password, currency } = req.body;
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email });
    if (user) return res.status(400).send("user registered");
    user = new User({
        email,
        password: await hashPassword(password),
        currency
    });
    await user.save();
    const token = user.generateAuthToken();
    res.header("auth-token", token).send({
        email,
        currency
    });
});

module.exports = router;
