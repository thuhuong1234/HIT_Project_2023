const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/forgot-password").get(forgotPassword);
authRouter.route("/reset-password").put(resetPassword);

module.exports = authRouter;
