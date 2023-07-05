const Member = require("../models/members.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const crypto = require("crypto");

const login = async (password, email) => {
  const member = await Member.findOne({ email });
  if (!member || !(await member.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid account or password!");
  }
  return member;
};

const refreshToken = async (res, member, newRefreshToken) => {
  await Member.findByIdAndUpdate(
    member._id,
    { refreshToken: newRefreshToken },
    { new: true }
  );
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

module.exports = {
  login,
  refreshToken,
  resetToken,
  resetPassword,
};
