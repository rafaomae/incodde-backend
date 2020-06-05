const Joi = require("@hapi/joi");

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

module.exports = {
  validateBody(req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    return next();
  },
};
