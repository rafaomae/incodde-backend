const { Router } = require("express");

const { send } = require("../controllers/emailController");
const { postValidator } = require("../middlewares/validators/email");

const routes = Router();

routes.post("/email/send", postValidator, send);

module.exports = routes;
