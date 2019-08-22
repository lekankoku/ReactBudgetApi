const { Account } = require("../models/account");
const { User } = require("../models/user");
const { Transaction } = require("../models/transaction");
const {
    validateTransaction,
    validateUpdates
} = require("../helpers/transaction-helper");
const { isAuthorized } = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const transaction = await Transaction.findOne({ _id: req.body._id });
    res.send(transaction);
});

router.post("/create", isAuthorized, async (req, res) => {
    const { error } = validateTransaction(req.body);
    const {
        amount,
        notes,
        type,
        category,
        isReoccuring,
        _accountId
    } = req.body;
    if (error) return res.status(400).send(error.details[0].message);
    let account = await Account.findOne({ _id: _accountId });
    let user = await User.findOne({ _id: req.user._id });
    let transaction = new Transaction({
        amount,
        notes,
        type,
        category,
        isReoccuring,
        _userId: req.user._id,
        _accountId
    });
    await transaction.save();

    user.transactions.push(transaction._id);
    account.transactions.push(transaction._id);
    if (transaction.type === "expense") {
        account.balance = account.balance - transaction.amount;
        account.cumulativeOutflow += transaction.amount;
    } else {
        account.balance = account.balance + transaction.amount;
        account.cumulativeInflow += transaction.amount;
    }
    await account.save();
    await user.save();
    res.send(transaction);
});

// router.put("/update", isAuthorized, async (req, res) => {
//     const { error } = validateUpdates(req.body);
//     const {
//         amount,
//         notes,
//         type,
//         category,
//         isReoccuring,
//         _id
//     } = req.body;
//     if (error) return res.status(400).send(error.details[0].message);

//     const transaction = await Transaction.findByIdAndUpdate(
//         _id,
//         {
//             name,
//             notes,
//             type
//         },
//         { new: true }
//     );

//     if (!account) return res.status(404).send("Account not found");

//     res.send(account);
// });
// router.delete("/delete", isAuthorized, async (req, res) => {
//     const transaction = await Transaction.findByIdAndRemove(req.body._id);

//     let user = await User.findOne({ _id: req.user._id });
//     const indexToDel = user.accounts.findIndex(id => {
//         id === req.body._id;
//     });

//     user.accounts.splice(indexToDel, 1);

//     let user = await User.findOne({ _id: req.user._id });
//     const indexToDel = user.accounts.findIndex(id => {
//         id === req.body._id;
//     });

//     user.accounts.splice(indexToDel, 1);
//     await user.save();
//     res.send(account);
// });

module.exports = router;
