const mongoose = require("mongoose");
const { celebrate, Joi } = require("celebrate");

const customValidateId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value))
    return helpers.error("id.invalid");

  return value;
};

const customIdValidator = Joi.string()
  .custom(customValidateId)
  .required()
  .messages({
    "id.invalid": "Parâmetro [Id] inválido",
  });

module.exports = { customIdValidator };
