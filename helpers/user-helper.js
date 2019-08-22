const Joi = require("joi");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

function validateNewUser(user) {
    const schema = {
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .min(5)
            .max(255)
            .required(),
        currency: Joi.object({
            name: Joi.string().required(),
            symbol: Joi.string()
                .required()
                .max(1),
            code: Joi.string().required()
        })
    };

    return Joi.validate(user, schema);
}

function validateOldUser(user) {
    const schema = {
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .min(5)
            .max(255)
            .required()
    };

    return Joi.validate(user, schema);
}

exports.hashPassword = hashPassword;
exports.validateNewUser = validateNewUser;
exports.validateOldUser = validateOldUser;
