const { Router } = require("express");

const {
  index,
  post,
  update,
  remove,
} = require("../controllers/userController");

const { validateId } = require("../middleware/validators/paramsValidator");
const { validateBody } = require("../middleware/validators/userValidator");
const auth = require("../middleware/authentication/auth");

const routes = Router();
routes.get("/users", index);
routes.post("/user", validateBody, post);
routes.put("/user/:id", validateId, validateBody, update);
routes.delete("/user/:id", validateId, remove);

module.exports = routes;
