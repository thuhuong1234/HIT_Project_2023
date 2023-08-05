
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testScoreSchema = new Schema(
  {
    score:{
      type:Number,
      required:true,
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required:true,
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref:"Comment"
    },
    test:[{ type: Schema.Types.ObjectId, ref: "Test" }],
    scoredBy: {type: Schema.Types.ObjectId,ref: "Member",},
  },
  {
    timestamps: true,
  }
);

const TestScore = mongoose.model("TestScore", testScoreSchema);

module.exports = TestScore;
