
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testScoreSchema = new Schema(
  {
    score:{
      type:Number,
      required:true,
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref:"Comment"
    },
    task:[{ type: Schema.Types.ObjectId, required:true,ref: "Task" }],
    scoredBy: {type: Schema.Types.ObjectId,ref: "Member",},
  },
  {
    timestamps: true,
  }
);

const TestScore = mongoose.model("TestScore", testScoreSchema);

module.exports = TestScore;
