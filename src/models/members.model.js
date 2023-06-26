const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const memberSchema = new Schema({
  MemberId: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  DateOfBirth: {
    type: Date,
  },
  Gender: {
    type: String,
  },
  Image: {
    type: String,
  },
  Address: {
    type: String,
  },
  Role: {
    type: String,
  },
  Password: {
    type: String,
    required: true,
  },
  StudentCode: {
    type: String,
    required: true,
  },
});
const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
