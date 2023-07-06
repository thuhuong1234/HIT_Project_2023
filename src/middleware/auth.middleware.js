const Member = require("../models/members.model");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");

const authMiddleware = catchAsync(async (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new ApiError(httpStatus.NOT_FOUND, "Unauthorized");
  }
  const token = authorization.split(" ")[1];
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  const memberId = payload.memberId;
  console.log(payload);
  const member = await Member.findById(memberId).select("-password -refreshToken -role");
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }
  req.user = member;
  console.log(req.user);
  res.json({
    status: httpStatus.OK,
    data: member,
  });
});

module.exports = authMiddleware;
