const mongoose = require("mongoose");
const { currencySchema } = require("./currency");
const Model = mongoose.model;
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    currency: { type: currencySchema, required: true },
    accounts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Account"
        }
    ],
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Account"
        }
    ]
});
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, "euidjijknoknp;");
};
const User = Model("User", userSchema);

exports.User = User;
