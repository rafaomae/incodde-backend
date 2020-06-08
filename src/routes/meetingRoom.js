const { Router } = require("express");

const {
  getAll,
  getById,
  post,
  update,
  remove,
} = require("../controllers/meetingRoomController");

const {
  getMeeting,
  createMeeting,
  updateMeeting,
  removeMeeting,
} = require("../controllers/meetingController");

const {
  getValidator,
  postValidator,
  putValidator,
  removeValidator,
} = require("../middlewares/validators/meetingRoom");

const {
  getMeetingValidator,
  postMeetingValidator,
  putMeetingValidator,
  removeMeetingValidator,
} = require("../middlewares/validators/meeting");
const { validateAuth } = require("../middlewares/authentication/auth");

const routes = Router();
routes.get("/meetingrooms", validateAuth(), getAll);
routes.get("/meetingroom/:id", validateAuth(), getValidator, getById);
routes.post("/meetingroom", validateAuth(["ADMIN"]), postValidator, post);
routes.put("/meetingroom/:id", validateAuth(["ADMIN"]), putValidator, update);
routes.delete(
  "/meetingroom/:id",
  validateAuth(["ADMIN"]),
  removeValidator,
  remove
);

routes.get(
  "/meetingroom/:id/meeting/:meetingId",
  validateAuth(),
  getMeetingValidator,
  getMeeting
);
routes.post(
  "/meetingroom/:id/meeting",
  validateAuth(),
  postMeetingValidator,
  createMeeting
);
routes.put(
  "/meetingroom/:id/meeting/:meetingId",
  validateAuth(),
  putMeetingValidator,
  updateMeeting
);
routes.delete(
  "/meetingroom/:id/meeting/:meetingId",
  validateAuth(),
  removeMeetingValidator,
  removeMeeting
);

module.exports = routes;
