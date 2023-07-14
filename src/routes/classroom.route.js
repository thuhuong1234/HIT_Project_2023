const express = require("express");
const {
  getClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
} = require("../controllers/member.controller");

const ClassroomRouter = express.Router();

ClassroomRouter.route("/").get(getClassrooms).post(createClassroom);
ClassroomRouter.route("/:ClassroomId")
  .get(getClassroom)
  .put(updateClassroom)
  .delete(deleteClassroom);
  
module.exports = ClassroomRouter;
