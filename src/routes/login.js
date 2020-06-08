const { Router } = require("express");

const { login } = require("../controllers/loginController");
const { postValidator } = require("../middlewares/validators/login");

const routes = Router();

routes.post("/login", postValidator, login);

module.exports = routes;
