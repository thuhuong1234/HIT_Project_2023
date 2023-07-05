const Member = require("../models/members.model");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const {memberService, authService} = require("../services");

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

const login = catchAsync(async (req, res) => {
    const { password, email } = req.body;
    const member = await authService.login(password, email);
    const accessToken = await member.generateAccessToken ();
    const refreshToken = await member.generateRefreshToken();
    await authService.refreshToken(res, member, refreshToken);
  
    res.json({
      status: httpStatus.OK,
      accessToken: accessToken,
    });
  });
module.exports = {
    register,
    login,
}