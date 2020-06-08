const { celebrate, Joi } = require("celebrate");
const { customIdValidator } = require("./id");

const bodySchema = Joi.object().keys({
  start: Joi.date().required().messages({
    "date.base": "Data de início inválida",
    "any.required": "Data de início não informada",
  }),
  end: Joi.date().required().messages({
    "date.base": "Data de término inválida",
    "any.required": "Data de término não informada",
  }),
  createdBy: Joi.string().empty().required().messages({
    "string.base": "Criador do agendamento não informado",
    "string.empty": "Criador do agendamento não pode ser vazio",
    "any.required": "Criador do agendamento não informado",
  }),
  usedBy: Joi.string().empty().required().messages({
    "string.base": "Utilizador da workstation não informado",
    "string.empty": "Utilizador da workstation não pode ser vazio",
    "any.required": "Utilizador da workstation não informado",
  }),
});

const getScheduleValidator = celebrate({
  params: {
    id: customIdValidator,
    scheduleId: customIdValidator,
  },
});

const postScheduleValidator = celebrate({
  params: { id: customIdValidator },
  body: bodySchema,
});

const putScheduleValidator = celebrate({
  params: {
    id: customIdValidator,
    scheduleId: customIdValidator,
  },
  body: bodySchema,
});

const removeScheduleValidator = celebrate({
  params: {
    id: customIdValidator,
    scheduleId: customIdValidator,
  },
});

module.exports = {
  getScheduleValidator,
  postScheduleValidator,
  putScheduleValidator,
  removeScheduleValidator,
};
