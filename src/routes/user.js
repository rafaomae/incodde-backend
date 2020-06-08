const { Router } = require("express");

const {
  index,
  getById,
  post,
  update,
  remove,
} = require("../controllers/userController");

const {
  getValidator,
  postValidator,
  putValidator,
  removeValidator,
} = require("../middlewares/validators/user");

const { validateAuth } = require("../middlewares/authentication/auth");

const routes = Router();
routes.get("/users", validateAuth(["ADMIN"]), index);
routes.get("/user/:id", validateAuth(), getValidator, getById);
routes.post("/user", validateAuth(["ADMIN"]), postValidator, post);
routes.put("/user/:id", validateAuth(), putValidator, update);
routes.delete("/user/:id", removeValidator, remove);

module.exports = routes;
