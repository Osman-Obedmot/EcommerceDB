const joiOptions = {
  abortEarly: false, // return all errors, not just the first
  allowUnknown: false, // reject extra fields
  stripUnknown: true, // remove unknown fields automatically
};

module.exports = joiOptions;
