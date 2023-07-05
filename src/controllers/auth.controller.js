const Member = require("../models/members.model");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const memberService = require("../services/member.service");

const register = catchAsync(async (req, res) => {
  const newMember = req.body;
  const member = await memberService.createMember(newMember);
  const accessToken = member.generateAccessToken();
  res.json({
    status: httpStatus.CREATED,
    accessToken: accessToken,
    data: member,
  });
});

module.exports = {
    register,
}