const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    nameTest:{
      type:String,
      required:true,
    },
    content: {
      type: String,
      require: true,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    unit:[{ type: Schema.Types.ObjectId, ref: "Unit" }],
    createdBy: {type: Schema.Types.ObjectId,ref: "Member"},
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
