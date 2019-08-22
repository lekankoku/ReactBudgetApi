const { isAuthorized } = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Account } = require("../models/account");

router.get("/", isAuthorized, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user._id })
            .select("-password")
            .populate("accounts transactions");
        res.send(user);
    } catch (error) {
        console.log(error);
    }
});
router.put("/currency", isAuthorized, async (req, res) => {
    const { currency } = req.body;
    // if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            currency
        },
        { new: true }
    );

    if (!user) return res.status(404).send("User not found");

    res.send(user);
});
module.exports = router;
