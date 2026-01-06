const joiOptions = require("../validater-joi/joiOptions");

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, joiOptions);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: error.details.map((d) => d.message),
    });
  }

  req.body = value;
  next();
};

module.exports = validate;
