const { celebrate, Joi } = require("celebrate");
const { customIdValidator } = require("./id");

const bodySchema = Joi.object().keys({
  name: Joi.string().empty().required().messages({
    "string.base": "Nome não informado",
    "string.empty": "Nome não pode ser vazio",
    "any.required": "Nome não informado",
  }),
  description: Joi.string().empty().required().messages({
    "string.base": "Descrição não informada",
    "string.empty": "Descrição não pode ser vazia",
    "any.required": "Descrição não informado",
  }),
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

const removeValidator = celebrate({
  params: {
    id: customIdValidator,
  },
});

module.exports = {
  getValidator,
  postValidator,
  putValidator,
  removeValidator,
};
