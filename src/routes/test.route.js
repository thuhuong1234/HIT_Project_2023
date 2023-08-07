const express = require("express");
const {
    getTests,
    getTest,
    createTest,
    updateTest,
    deleteTest,
} = require("../controllers/test.controller");
const roles = require("../middleware/role.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware")

const TestRouter = express.Router();

TestRouter.use(authMiddleware);
TestRouter.route("/").get(getTests);

TestRouter.route("/:testId").get(getTest);

TestRouter.use(roles(["leader"]));

TestRouter.route("/").post(upload.single("content"),createTest);
TestRouter.route("/:testId")
  .put(upload.single("content"),updateTest)
  .delete(deleteTest);

module.exports = TestRouter;
