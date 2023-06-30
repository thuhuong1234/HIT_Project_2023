const Member = require("../models/members.model");
const apiError = require("../utils/apiError");
const httpStatus = require("http-status");
const APIFeatures = require("../utils/apiFeatures");

const getMembers = async (query) => {
  const feature = new APIFeatures(Member.find(), query).paginate();
  return feature.query;
};
const getMember = async (memberId) => {
  const member = await Member.findById(memberId);
  if (!member) {
    throw new apiError(httpStatus.NOT_FOUND, "Member not found!");
  }
  return member;
};
const createMember = async (newMember) => {
  if (!newMember.name || !newMember.password || !newMember.studentCode) {
    throw new apiError(
      httpStatus.BAD_REQUEST,
      "Member's information is not enough!"
    );
  }

  const checkMember = await Member.findOne({
    studentCode: newMember.studentCode,
  });
  if (checkMember) {
    throw new apiError(httpStatus.BAD_REQUEST, "Member already exists!");
  }

  const member = await Member.create(newMember);
  return member;
};
const updateMember = async (memberId, updateMember) => {
  const member = await Member.findByIdAndUpdate(memberId, updateMember);
  if (!member) {
    throw new apiError(httpStatus.NOTFOUND, "Member not found!");
  }
  return member;
};
const deleteMember = async (memberId) => {
  const member = await Member.findByIdAndDelete(memberId);
  if (!member) {
    throw new apiError(httpStatus.NOTFOUND, "Member not found!");
  }
  return member;
};
module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
};
