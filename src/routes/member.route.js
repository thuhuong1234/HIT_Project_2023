const express = require("express");
const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/member.controller");
const roles = require("../middleware/role.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const MemberRouter = express.Router();

MemberRouter.use(authMiddleware);
MemberRouter.route("/").get(getMembers);

MemberRouter.use(roles(["leader"]));

MemberRouter.route("/").post(createMember);
MemberRouter.route("/:memberId").get(getMember).put(updateMember).delete(deleteMember);

module.exports = MemberRouter;

