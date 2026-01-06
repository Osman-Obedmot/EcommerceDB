const Joi = require("joi");

const createProductSchema = Joi.object({
  productName: Joi.string().min(3).required(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().positive().precision(2).required(),
  quantityInStock: Joi.number().integer().min(0).required(),
  category: Joi.string().min(3).required(),
});

const updateProductSchema = Joi.object({
  productName: Joi.string().min(3).optional(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().positive().precision(2).optional(),
  quantityInStock: Joi.number().integer().min(0).optional(),
  category: Joi.string().min(3).optional(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};