const Member = require("../models/members.model");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const getMembers = catchAsync(async (req, res) => {
  const members = await Member.find();
  res.status(httpStatus.OK).json({ members });
});

const getMember = catchAsync(async (req, res) => {
const memberId = req.params.memberId;
  const member = await Member.findById(memberId);
  if (!member){
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found!");
  } 
  res.status(httpStatus.OK).json({ member });
});

const createMember = catchAsync(async (req, res) => {
  const newMember = req.body;
  if (!newMember.Name || !newMember.Password || !newMember.StudentCode) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Member's information is not enough!"
    );
  }

  const checkMember = await Member.findOne({
    StudentCode: newMember.StudentCode,
  });
  if (checkMember) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Member already exists!");
  }

  const member = await Member.create(newMember);
  res.status(httpStatus.CREATED).json({ member });
});

const updateMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const newMember = req.body;
  const updateMember = await Member.findByIdAndUpdate(memberId, newMember);
  if (!updateMember) {
    throw new ApiError(httpStatus.NOTFOUND, "Member not found!");
  }
  res.status(httpStatus.OK).json({ updateMember });
});

const deleteMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;

  const deleteMember = await Member.findByIdAndDelete(memberId);
  if (!deleteMember) {
    throw new ApiError(httpStatus.NOTFOUND, "Member not found!");
  }
  res.status(httpStatus.OK).json({ deleteMember });
});

module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
};
