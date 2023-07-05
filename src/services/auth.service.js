const Member = require("../models/members.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

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

module.exports = {
    login,
    refreshToken,
}