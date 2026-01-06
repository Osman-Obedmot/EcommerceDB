const Joi = require("joi");

const strongPassword = require("./password");

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: strongPassword.required(),
  roles: Joi.string().valid("ADMIN", "CUSTOMER").optional(),
});

module.exports = {
  createUserSchema,
};
