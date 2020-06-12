const { celebrate, Joi: JoiBase } = require("celebrate");
const { cpf } = require("cpf-cnpj-validator");
const JoiDate = require("@hapi/joi-date");
const { customIdValidator } = require("./id");

const Joi = JoiBase.extend(JoiDate);

const customCpfValidator = (value, helpers) => {
  if (!cpf.isValid(value)) return helpers.error("cpf.invalid");

  return value;
};

const bodySchema = Joi.object().keys({
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
  cpf: Joi.string().empty().required().custom(customCpfValidator).messages({
    "string.base": "CPF não informado",
    "string.empty": "CPF não pode ser vazio",
    "cpf.invalid": "CPF informado está inválido",
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
  confirmed: Joi.boolean(),
});

const getValidator = celebrate({
  params: {
    id: customIdValidator,
  },
});

const postValidator = celebrate({
  body: bodySchema,
});

const putValidator = celebrate({
  params: {
    id: customIdValidator,
  },
  body: bodySchema,
});

const patchAdminValidator = celebrate({
  params: {
    id: customIdValidator,
    isAdmin: Joi.boolean().required().messages({
      "any.required": "Flag Admin não informada",
    }),
  },
});

const patchConfirmedValidator = celebrate({
  params: {
    id: customIdValidator,
  },
});

const removeValidator = celebrate({
  params: {
    id: customIdValidator,
  },
});

module.exports = {
  getValidator,
  postValidator,
  putValidator,
  patchAdminValidator,
  patchConfirmedValidator,
  removeValidator,
};
