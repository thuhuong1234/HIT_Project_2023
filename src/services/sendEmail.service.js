const nodemailer = require("nodemailer");

const sendEmail = async (email, html) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  return transporter.sendMail({
    from: "'Quản lý lớp học' <no-relply@quanlylophoc.com>",
    to: email,
    subject: "Forgot password",
    html: html,
  });
};

module.exports = sendEmail;
