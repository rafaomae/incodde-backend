const { Router } = require("express");

const {
  getAll,
  getById,
  post,
  update,
  remove,
} = require("../controllers/workStationController");

const {
  getSchedule,
  createSchedule,
  updateSchedule,
  removeSchedule,
} = require("../controllers/workStationScheduleController");

const { validateAuth } = require("../middlewares/authentication/auth");

const {
  getValidator,
  postValidator,
  putValidator,
  removeValidator,
} = require("../middlewares/validators/workstation");

const {
  getScheduleValidator,
  postScheduleValidator,
  putScheduleValidator,
  removeScheduleValidator,
} = require("../middlewares/validators/workStationSchedule");

const routes = Router();
routes.get("/workstations", validateAuth(), getAll);
routes.get("/workstation/:id", validateAuth(), getValidator, getById);
routes.post("/workstation", validateAuth(["ADMIN"]), postValidator, post);
routes.put("/workstation/:id", validateAuth(["ADMIN"]), putValidator, update);
routes.delete(
  "/workstation/:id",
  validateAuth(["ADMIN"]),
  removeValidator,
  remove
);

routes.get(
  "/workstation/:id/schedule/:scheduleId",
  validateAuth(),
  getScheduleValidator,
  getSchedule
);
routes.post(
  "/workstation/:id/schedule",
  validateAuth(),
  postScheduleValidator,
  createSchedule
);
routes.put(
  "/workstation/:id/schedule/:scheduleId",
  validateAuth(),
  putScheduleValidator,
  updateSchedule
);
routes.delete(
  "/workstation/:id/schedule/:scheduleId",
  validateAuth(),
  removeScheduleValidator,
  removeSchedule
);

module.exports = routes;
