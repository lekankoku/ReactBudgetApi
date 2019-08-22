const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Model = mongoose.model;
const transactionsSchema = require("../models/transaction");
const accountSchema = new Schema({
    name: String,
    balance: { type: Number, default: 0 },
    notes: String,
    type: String,
    cumulativeInflow: { type: Number, default: 0 },
    cumulativeOutflow: { type: Number, default: 0 },
    transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
    _userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

function validateAccount(account) {
    const schema = {
        name: Joi.string()
            .min(5)
            .max(50)
            .required(),
        type: Joi.string().required()
    };

    return Joi.validate(account, schema);
}

const Account = Model("Account", accountSchema);

exports.accountSchema = accountSchema;
exports.Account = Account;
exports.validate = validateAccount;
