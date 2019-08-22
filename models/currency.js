const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Model = mongoose.model;
const currencySchema = new Schema({
    name: String,
    symbol: String,
    code: String
});

exports.currencySchema = currencySchema;
