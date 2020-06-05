const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");

const Joi = JoiBase.extend(JoiDate);
const schema = Joi.object().keys({
  name: Joi.string().required().empty().messages({
    "string.base": "Nome não informado",
    "string.empty": "Nome não pode ser vazio",
    "any.required": "Nome não informado",
  }),
  birthDate: Joi.date().format("DD/MM/YYYY").required().messages({
    "date.base": "Data de nascimento não informada",
    "date.format": "Formato da Data de Nascimento é inválida",
    "any.required": "Data não informada",
  }),
  cpf: Joi.string().empty().required().messages({
    "string.base": "CPF não informado",
    "string.empty": "CPF não pode ser vazio",
    "any.required": "CPF não informado",
  }),
  address: Joi.string().empty().required().messages({
    "string.base": "Endereço não informado",
    "string.empty": "Endereço não pode ser vazio",
    "any.required": "Endereço não informado",
  }),
  bio: Joi.string().allow(""),
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
  isAdmin: Joi.boolean().required(),
});

module.exports = {
  validateBody(req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    return next();
  },
};
