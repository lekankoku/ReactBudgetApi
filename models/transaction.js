const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;
const Model = mongoose.model;
const TransactionSchema = new Schema({
    amount: Number,
    notes: String,
    type: String,
    category: String,
    isReoccuring: { type: Boolean, default: false },
    _userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    _accountId: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    }
});

const Transaction = Model("Transaction", TransactionSchema);
exports.TransactionSchema = TransactionSchema;
exports.Transaction = Transaction;
