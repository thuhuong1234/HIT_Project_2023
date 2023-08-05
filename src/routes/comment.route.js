const express = require("express");
const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  replyComment,
} = require("../controllers/comment.controller");
const authMiddleware = require("../middleware/auth.middleware");

const CommentRouter = express.Router();

CommentRouter.use(authMiddleware);
CommentRouter.route("/").get(getComments).post(createComment);

CommentRouter.route("/:commentId")
  .get(getComment)
  .put(updateComment)
  .delete(deleteComment)
  .post(replyComment);

module.exports = CommentRouter;
