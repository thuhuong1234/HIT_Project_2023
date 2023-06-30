const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const memberService = require("../services/member.service");

const getMembers = catchAsync(async (req, res) => {
  const members = await memberService.getMembers(req.query);
  res.json({
    status: httpStatus.OK,
    data: members,
  });
});

const getMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const member = await memberService.getMember(memberId);
  res.json({
    status: httpStatus.OK,
    data: member,
  });
});

const createMember = catchAsync(async (req, res) => {
  const newMember = req.body;
  const member = await memberService.createMember(newMember);
  res.json({
    status: httpStatus.CREATED,
    data: member,
  });
});

const updateMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const updateMember = req.body;
  const member = await memberService.updateMember(memberId, updateMember);
  res.json({
    status: httpStatus.OK,
    data: member,
  });
});

const deleteMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const member = await memberService.deleteMember(memberId);
  res.json({
    status: httpStatus.OK,
    data: member,
  });
});

module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
};
