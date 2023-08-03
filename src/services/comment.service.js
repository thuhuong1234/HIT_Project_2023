const Comment = require("../models/comments.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const APIFeatures = require("../utils/apiFeatures");

const getComments = async (query) => {
  const comments = new APIFeatures(Comment.find(), query)
    .filter()
    .sort()
    .paginate();

  return comments.query;
};

const getComment = async (commentId) => {
  const comment = await Comment.findById(commentId).populate(
    "commentBy",
    "name email -_id"
  );
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found!");
  }

  return comment;
};

const createComment = async (newComment) => {
  if (!newComment.content) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Comment's information is not enough!"
    );
  }
  const comment = await Comment.create(newComment);

  return comment;
};

const updateComment = async (commentId, updateComment, req) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(httpStatus.NOTFOUND, "Comment not found!");
  }
  if (comment.commentBy.toString() !== req.user.id) {
    throw new ApiError(httpStatus.NOTFOUND, "Forbidden!");
  }
  
  await Comment.updateOne({ _id: commentId },{content:updateComment},{new:true})

};

const deleteComment = async (commentId,req) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOTFOUND, "Comment not found!");
  }

  if (comment.commentBy.toString() !== req.user.id) {
    throw new ApiError(httpStatus.NOTFOUND, "Forbidden!");
  }

  await Comment.deleteOne({_id:commentId},{new:true})
};

const replyComment = async (commentId,reply)=>{
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new ApiError(httpStatus.NOTFOUND, "Comment not found!");
    }  
    const parentComment = await Comment.find((c) => c.id === parentId);
    if(!parentComment){
      throw new ApiError(httpStatus.NOTFOUND, "Parent comment not found!");
    }
    await Comment.create({comments:reply},{parentId:parentId},{new:true})
}
module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  replyComment
};
