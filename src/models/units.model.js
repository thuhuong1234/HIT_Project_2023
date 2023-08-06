const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitSchema = new Schema(
  {
    nameUnit: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
    content: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },
  },
  {
    timestamps: true,
  }
);

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
