const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const commentService = require("../services/comment.service");

const getComments = catchAsync(async (req, res) => {
  const comments = await commentService.getComments(req.query);

  res.json({
    status: httpStatus.OK,
    data: comments,
  });
});

const getComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;

  const comment = await commentService.getComment(commentId);

  res.json({
    status: httpStatus.OK,
    data: comment,
  });
});

const createComment = catchAsync(async (req, res) => {
  const newComment = req.body;
  newComment.commentBy = req.user.id;

  const comment = await commentService.createComment(newComment);

  res.json({
    status: httpStatus.CREATED,
    data: comment,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const updateComment = req.body.content;

   await commentService.updateComment(commentId,updateComment,req);

  res.json({
    status: httpStatus.OK,
    message: "Update comment successfull!",
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  
  await commentService.deleteComment(commentId,req);

  res.json({
    status: httpStatus.OK,
    message: "Delete comment successfull!",
  });
});

const replyComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const reply = req.body;

  await commentService.replyComment(commentId,reply,req);

  res.json({
    status: httpStatus.OK,
    message: "Reply comment successfull!",
  });
});

module.exports = {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment,
    replyComment
};
