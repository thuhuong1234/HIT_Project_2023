const express = require("express");
const memberRouter = require("../routes/member.route");
const authRouter = require("../routes/auth.route");
const unitRouter = require("../routes/unit.route");
const classroomRouter = require("../routes/classroom.route");
const testRouter = require("../routes/test.route");
const commentRouter = require("./comment.route");
const testScoreRouter = require("./testScore.route");
const taskRouter = require("./task.route");

const router = express.Router();

const routes = [
  {
    path: "/members",
    route: memberRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/units",
    route: unitRouter,
  },
  {
    path: "/classrooms",
    route: classroomRouter,
  },
  {
    path: "/tests",
    route: testRouter,
  },
  {
    path: "/comments",
    route: commentRouter,
  },
  {
    path: "/testScores",
    route: testScoreRouter,
  },
  {
    path: "/tasks",
    route: taskRouter,
  }
];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
