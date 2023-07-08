const Member = require("../models/members.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const login = async (password, email) => {
  const member = await Member.findOne({ email });
  if (!member || !(await member.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid account or password!");
  }
  return member;
};

const refreshToken = async (res, member, newRefreshToken) => {
  await Member.findByIdAndUpdate(member._id, { new: true });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const resetToken = async (email) => {
  const member = await Member.findOne({ email });
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found!");
  }
  const resetToken = member.createPasswordChangedToken();
  await member.save();
  return resetToken;
};

const resetPassword = async (token) => {
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const member = await Member.findOne({
    passwordResetToken: passwordResetToken,
  });
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid reset token");
  }
  return member;
};

const refreshAccessToken = async (cookie) => {
  const payload = jwt.verify(cookie, process.env.SECRET_KEY);
  const memberId = payload.memberId;
  const member = await Member.findById(memberId);
  return member;
};

const logout = async (cookie, res) => {
  const payload = jwt.verify(cookie, process.env.SECRET_KEY);
  const memberId = payload.memberId;
  await Member.findByIdAndUpdate(memberId, { refreshToken: "" }, { new: true });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
};

module.exports = {
  login,
  refreshToken,
  resetToken,
  resetPassword,
  refreshAccessToken,
  logout,
};
