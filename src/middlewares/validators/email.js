const { celebrate, Joi } = require("celebrate");

const schema = Joi.object().keys({
  from: Joi.string().email().required().messages({
    "string.empty": "Remetente não informado",
    "string.email": "Remetente inválido",
    "any.required": "Remetente não informado",
  }),
  to: Joi.string().email().required().messages({
    "string.empty": "Destinatário não informado",
    "string.email": "Destinatário inválido",
    "any.required": "Destinatário não informado",
  }),
  subject: Joi.string().required().messages({
    "string.empty": "Assunto não informado",
    "any.required": "Assunto não informado",
  }),
  text: Joi.string().required().messages({
    "string.empty": "Corpo do e-mail não informado",
    "any.required": "Corpo do e-mail não informado",
  }),
});

const postValidator = celebrate({
  body: schema,
});

module.exports = { postValidator };
