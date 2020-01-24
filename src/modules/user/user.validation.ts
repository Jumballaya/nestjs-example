import Joi = require('@hapi/joi');

export const validateNewUserBody = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
});
