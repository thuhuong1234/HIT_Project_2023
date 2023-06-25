const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const memberSchema = new Schema({
  MemberID: {
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
  Address:{
    type:String
  },
  Role:{
    type:String
  },
  Password:{
    type:String,
  },
  StudentCode:{
    type:String,
  }
});
const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
