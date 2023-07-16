const express = require("express");
const {
  getClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
} = require("../controllers/classroom.controller");
const roles = require("../middleware/role.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const ClassroomRouter = express.Router();

ClassroomRouter.use(authMiddleware);
ClassroomRouter.route("/").get(getClassrooms);

ClassroomRouter.route("/:classroomId").get(getClassroom);

ClassroomRouter.use(roles(["leader"]));

ClassroomRouter.route("/").post(createClassroom);
ClassroomRouter.route("/:classroomId").put(updateClassroom).delete(deleteClassroom);

module.exports = ClassroomRouter;

