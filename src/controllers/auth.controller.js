const Member = require("../models/members.model");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const { memberService, authService, sendEmail } = require("../services");

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
  const accessToken = await member.generateAccessToken();
  const refreshToken = await member.generateRefreshToken();
  await authService.refreshToken(res, member, refreshToken);

  res.json({
    status: httpStatus.OK,
    accessToken: accessToken,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.query;
  if (!email) {
    throw new ApiError(httpStatus.NOT_FOUND, "Missing email!");
  }
  const resetToken = await authService.resetToken(email);
  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/auth/reset-password/${resetToken}>Click here</a>`;
  const reset = await sendEmail(email, html);
  res.json({
    status: httpStatus.OK,
    message: "success",
    reset,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { password, token } = req.body;
  const member = await authService.resetPassword(token);
  member.password = password;
  member.passwordResetToken = undefined;
  member.passwordResetEprires = undefined;
  member.passwordChangeAt = Date.now();
  await member.save();
  res.json({
    status: httpStatus.OK,
    message: "Reset password successful",
    member,
  });
});

const refreshAccessToken = catchAsync(async (req, res) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    throw new ApiError(httpStatus.NOT_FOUND, "No refresh token in cookies");
  }
  const refreshToken = cookie.split("=")[1];
  const member = await authService.refreshAccessToken(refreshToken);
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Refresh token not matched");
  }
  const newAccessToken = member.generateAccessToken();
  res.json({
    status: httpStatus.OK,
    newAccessToken,
  });
});

const logout = catchAsync(async (req, res) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    throw new ApiError(httpStatus.NOT_FOUND, "No refresh token in cookies");
  }
  const refreshToken = cookie.split("=")[1];
  await authService.logout(refreshToken, res);
  res.json({
    status: httpStatus.OK,
    mes: "Logouted!",
  });
});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
};
