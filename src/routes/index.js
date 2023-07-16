const express = require("express");
const memberRouter = require("../routes/member.route");
const authRouter = require("../routes/auth.route");
const unitRouter = require("../routes/unit.route");

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
];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
