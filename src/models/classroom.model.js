const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    className: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    quality: {
      type: String,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Classrom = mongoose.model("Classroom", classSchema);

module.exports = Classrom;
