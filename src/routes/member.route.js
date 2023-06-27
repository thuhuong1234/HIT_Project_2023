const express = require("express");
const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/member.controller");

const MemberRouter = express.Router();

MemberRouter.route('/').get(getMembers).post(createMember);
MemberRouter.route('/:memberId')
  .get(getMember)
  .put(updateMember)
  .delete(deleteMember);
module.exports = MemberRouter;
