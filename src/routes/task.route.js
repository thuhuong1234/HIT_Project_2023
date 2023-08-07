const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const roles = require("../middleware/role.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const TaskRouter = express.Router();

TaskRouter.use(authMiddleware);
TaskRouter.route("/").get(getTasks).post(upload.single("content"), createTask);

TaskRouter.use(roles(["leader"]));

TaskRouter.route("/:taskId")
  .get(getTask)
  .put(upload.single("content"), updateTask)
  .delete(deleteTask);

module.exports = TaskRouter;
