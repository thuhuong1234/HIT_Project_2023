const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { getMember } = require("../controllers/member.controller");
const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/forgot-password").get(forgotPassword);
authRouter.route("/reset-password").put(resetPassword);
authRouter.route("/get-me").get(authMiddleware, getMember);
authRouter.route("/refresh-access-token").post(refreshAccessToken);
authRouter.route("/logout").get(authMiddleware, logout);

module.exports = authRouter;
