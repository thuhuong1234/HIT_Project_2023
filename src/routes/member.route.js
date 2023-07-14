const express = require("express");
const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/member.controller");
const roles = require('../middleware/role.middleware')
const authMiddleware = require('../middleware/auth.middleware')
const MemberRouter = express.Router();

MemberRouter.route("/").get(getMembers).post(createMember);

MemberRouter.use(authMiddleware,roles(["leader"]));

MemberRouter.route("/:memberId")
  .get(getMember)
  .put(updateMember)
  .delete(deleteMember);
  
module.exports = MemberRouter;
