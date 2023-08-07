const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
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
    test: { type: Schema.Types.ObjectId, ref: "Test" },
    madeBy: { type: Schema.Types.ObjectId, required: true, ref: "Member" },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
