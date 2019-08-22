const { Account } = require("../models/account");
const { User } = require("../models/user");
const {
    validateAccount,
    validateUpdates
} = require("../helpers/account-helper");
const { isAuthorized } = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const account = await Account.findOne({ _id: req.body._id });
    res.send(account);
});

router.post("/create", isAuthorized, async (req, res) => {
    const { error } = validateAccount(req.body);
    const { name, notes, type, balance } = req.body;
    if (error) return res.status(400).send(error.details[0].message);
    // let account = await Account.findOne({ name });
    let user = await User.findOne({ _id: req.user._id });
    let account = new Account({
        name,
        balance,
        notes,
        type,
        _userId: req.user._id
    });
    await account.save();

    user.accounts.push(account._id);
    await user.save();
    res.send(user);
});

router.put("/update", isAuthorized, async (req, res) => {
    const { error } = validateUpdates(req.body);
    const { name, notes, type, _id } = req.body;
    if (error) return res.status(400).send(error.details[0].message);

    const account = await Account.findByIdAndUpdate(
        _id,
        {
            name,
            notes,
            type
        },
        { new: true }
    );

    if (!account) return res.status(404).send("Account not found");

    res.send(account);
});
router.delete("/delete", isAuthorized, async (req, res) => {
    const account = await Account.findByIdAndRemove(req.body._id);

    let user = await User.findOne({ _id: req.user._id });
    const indexToDel = user.accounts.findIndex(id => {
        id === req.body._id;
    });

    user.accounts.splice(indexToDel, 1);
    await user.save();
    res.send(account);
});

module.exports = router;
