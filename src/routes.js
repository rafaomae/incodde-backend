const express = require("express");

const userController = require("./controllers/userController");

const paramsValidator = require("./validators/paramsValidator");
const userValidator = require("./validators/userValidator");

const routes = express.Router();
routes.get("/api/users", userController.index);
routes.post("/api/user", userValidator.validateBody, userController.post);
routes.put(
  "/api/user/:id",
  paramsValidator.validateId,
  userValidator.validateBody,
  userController.update
);
routes.delete(
  "/api/user/:id",
  paramsValidator.validateId,
  userController.delete
);

module.exports = routes;
