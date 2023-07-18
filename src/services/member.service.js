const Member = require("../models/members.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const APIFeatures = require("../utils/apiFeatures");

const getMembers = async (query) => {
  const feature = new APIFeatures(
    Member.find().select("-password -refreshToken -role"),
    query
  )
    .filter()
    .sort()
    .paginate();
  return feature.query;
};

const getMember = async (memberId) => {
  const member = await Member.findById(memberId).select(
    "-password -refreshToken -role"
  );
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found!");
  }
  return member;
};

const createMember = async (newMember) => {
  if (
    !newMember.name ||
    !newMember.password ||
    !newMember.studentCode ||
    !newMember.email
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Member's information is not enough!"
    );
  }
  if (await Member.findOne({ studentCode: newMember.studentCode })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "StudentCode already exists!");
  }
  if (await Member.isEmailTaken(newMember.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "'Email already taken')!");
  }
  const member = await Member.create(newMember);
  return member;
};

const updateMember = async (memberId, updateMember) => {
  const member = await Member.findByIdAndUpdate(memberId, updateMember);
  if (!member) {
    throw new ApiError(httpStatus.NOTFOUND, "Member not found!");
  }
  return member;
};

const deleteMember = async (memberId) => {
  const member = await Member.findByIdAndDelete(memberId);
  if (!member) {
    throw new ApiError(httpStatus.NOTFOUND, "Member not found!");
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
