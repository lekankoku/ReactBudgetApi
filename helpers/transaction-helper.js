const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
function validateTransaction(transaction) {
    const schema = {
        amount: Joi.number().required(),
        type: Joi.string().required(),
        notes: Joi.string()
            .min(0)
            .max(1024),
        category: Joi.string()
            .min(0)
            .max(1024),
        balance: Joi.number(),
        isReoccuring: Joi.boolean(),
        _accountId: Joi.objectId().required()
    };

    return Joi.validate(transaction, schema);
}
function validateUpdates(account) {
    const schema = {
        _id: Joi.objectId().required(),
        amount: Joi.number().required(),
        type: Joi.string().required(),
        notes: Joi.string()
            .min(0)
            .max(1024),
        category: Joi.string()
            .min(0)
            .max(1024),
        balance: Joi.number(),
        isReoccuring: Joi.boolean()
    };

    return Joi.validate(account, schema);
}

exports.validateTransaction = validateTransaction;
exports.validateUpdates = validateUpdates;
