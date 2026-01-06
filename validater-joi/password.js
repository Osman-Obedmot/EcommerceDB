const Joi = require("joi");

const strongPassword = Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])"))
  .message(
    "Password must contain uppercase, lowercase, number, and special character"
  );

module.exports = strongPassword;
