const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    commentBy: {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    unit: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
    },
    task:{
      type: Schema.Types.ObjectId,
      ref: "Task",
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
