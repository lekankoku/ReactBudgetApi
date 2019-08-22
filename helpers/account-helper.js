const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
function validateAccount(account) {
    const schema = {
        name: Joi.string()
            .min(0)
            .max(50)
            .required(),
        type: Joi.string().required(),
        notes: Joi.string()
            .min(0)
            .max(1024),
        balance: Joi.number()
    };

    return Joi.validate(account, schema);
}
function validateUpdates(account) {
    const schema = {
        _id: Joi.objectId().required(),
        name: Joi.string()
            .min(0)
            .max(50)
            .required(),
        type: Joi.string().required(),
        notes: Joi.string()
            .min(0)
            .max(1024),
        balance: Joi.number()
    };

    return Joi.validate(account, schema);
}

exports.validateAccount = validateAccount;
exports.validateUpdates = validateUpdates;
