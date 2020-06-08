const { celebrate, Joi } = require("celebrate");

const schema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    "string.empty": "E-mail não informado",
    "string.email": "E-mail inválido",
    "any.required": "E-mail não informado",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Senha não informada",
    "string.min": "Senha requer no mínimo 6 caracteres",
    "any.required": "Senha não informada",
  }),
});

const postValidator = celebrate({
  body: schema,
});

module.exports = {
  postValidator,
};
