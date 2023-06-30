const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  image: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enums: ["leader", "member", "support"],
    default: "member",
  },
  password: {
    type: String,
    required: true,
  },
  studentCode: {
    type: String,
    required: true,
  },
});
const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
