const { Router } = require("express");

const {
  index,
  getById,
  post,
  patch,
  patchConfirmed,
  update,
  remove,
} = require("../controllers/userController");

const {
  postValidator,
  putValidator,
  removeValidator,
  patchAdminValidator,
  patchConfirmedValidator,
} = require("../middlewares/validators/user");

const { validateAuth } = require("../middlewares/authentication/auth");

const routes = Router();
routes.get("/users", validateAuth(), index);
routes.get("/user", validateAuth(), getById);
routes.post("/user", postValidator, post);
routes.patch("/user/:id/admin/:isAdmin", patchAdminValidator, patch);
routes.patch("/user/:id/confirmed", patchConfirmedValidator, patchConfirmed);
routes.put("/user/:id", validateAuth(), putValidator, update);
routes.delete("/user/:id", removeValidator, remove);

module.exports = routes;
