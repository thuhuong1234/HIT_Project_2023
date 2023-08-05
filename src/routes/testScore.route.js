const express = require("express");
const {
    getTestScores,
    getTestScore,
    createTestScore,
    updateTestScore,
    deleteTestScore,
} = require("../controllers/testScore.controller");
const roles = require("../middleware/role.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const TestScoreRouter = express.Router();

TestScoreRouter.use(authMiddleware);
TestScoreRouter.route("/").get(getTestScores);

TestScoreRouter.route("/:testScoreId").get(getTestScore);

TestScoreRouter.use(roles(["leader"]));

TestScoreRouter.route("/").post(createTestScore);
TestScoreRouter.route("/:testScoreId")
  .put(updateTestScore)
  .delete(deleteTestScore);

module.exports = TestScoreRouter;
