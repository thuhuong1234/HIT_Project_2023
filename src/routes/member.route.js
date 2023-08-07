const express = require("express");
const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  exportMembersToExcelFile,
} = require("../controllers/member.controller");
const roles = require("../middleware/role.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const MemberRouter = express.Router();

MemberRouter.use(authMiddleware);
MemberRouter.route("/").get(getMembers);

MemberRouter.route("/:memberId").put(upload.single("image"), updateMember);

MemberRouter.use(roles(["leader"]));

MemberRouter.route("/").post(upload.single("image"), createMember);
MemberRouter.route("/excel").get(exportMembersToExcelFile);
MemberRouter.route("/:memberId")
  .get(getMember)
  .delete(deleteMember);


module.exports = MemberRouter;
