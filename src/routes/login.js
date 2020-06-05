const { Router } = require("express");

const loginController = require("../controllers/loginController");
const loginValidator = require("../middleware/validators/loginValidator");

const routes = Router();

routes.post("/login", loginValidator.validateBody, loginController.login);

module.exports = routes;
