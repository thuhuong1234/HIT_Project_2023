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
      required:true,
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
    members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
    leader: [{ type: Schema.Types.ObjectId, ref: "Member" }],
    supports: [{ type: Schema.Types.ObjectId, ref: "Member" }],
    units: [{ type: Schema.Types.ObjectId, ref: "Unit" }],
  },
  {
    timestamps: true,
  }
);

const Classroom = mongoose.model("Classroom", classSchema);

module.exports = Classroom;
