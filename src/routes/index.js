const express = require("express");
const MemberRouter = require("../routes/member.route");

const router = express.Router();
const routes = [
  {
    path: '/members',
    route: MemberRouter,
  },
];

routes.map((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
