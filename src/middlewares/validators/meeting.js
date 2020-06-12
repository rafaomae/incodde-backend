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
  start: Joi.date().required().messages({
    "date.base": "Data de início inválida",
    "any.required": "Data de início não informada",
  }),
  end: Joi.date().required().messages({
    "date.base": "Data de término inválida",
    "any.required": "Data de término não informada",
  }),
  createdBy: Joi.string().empty().required().messages({
    "string.base": "Criador da reunião não informado",
    "string.empty": "Criador da reunião não pode ser vazio",
    "any.required": "Criador da reunião não informado",
  }),
  participants: Joi.array().optional(),
});

const getMeetingValidator = celebrate({
  params: {
    id: customIdValidator,
    meetingId: customIdValidator,
  },
});

const postMeetingValidator = celebrate({
  params: { id: customIdValidator },
  body: bodySchema,
});

const putMeetingValidator = celebrate({
  params: {
    id: customIdValidator,
    meetingId: customIdValidator,
  },
  body: bodySchema,
});

const removeMeetingValidator = celebrate({
  params: {
    id: customIdValidator,
    meetingId: customIdValidator,
  },
});

module.exports = {
  getMeetingValidator,
  postMeetingValidator,
  putMeetingValidator,
  removeMeetingValidator,
};
