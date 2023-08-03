const express = require("express");
const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const roles = require("../middleware/role.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const { replyComment } = require("../services/comment.service");

const CommentRouter = express.Router();

CommentRouter.use(authMiddleware);
CommentRouter.route("/").get(getComments).post(createComment);

CommentRouter.route("/:commentId")
  .get(getComment)
  .put(updateComment)
  .delete(deleteComment)
  .post(replyComment)
  
module.exports = CommentRouter;
