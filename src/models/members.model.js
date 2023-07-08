const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enums: ["leader", "member", "support"],
      default: "member",
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (pass) {
          return pass === this.password;
        },
        message: "Password is confirm",
      },
    },
    studentCode: {
      type: String,
      required: true,
    },
    passwordChangeAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetEprires: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

memberSchema.statics.isEmailTaken = async function (email) {
  const member = await this.findOne({ email });
  return !!member;
};

memberSchema.pre("save", async function (next) {
  try {
    const member = this;
    if (member.isModified("password")) {
      member.password = await bcrypt.hash(member.password, 8);
    }
    this.passwordConfirm = undefined;
  } catch (err) {
    next(err);
  }
  next();
});

memberSchema.methods = {
  generateAccessToken: function () {
    return jwt.sign(
      {
        memberId: this._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
  },
  isPasswordMatch: async function (password) {
    const member = this;
    return await bcrypt.compare(password, member.password);
  },
  generateRefreshToken: function () {
    return jwt.sign(
      {
        memberId: this._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN2,
      }
    );
  },
  createPasswordChangedToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetEprires = Date.now() + 15 * 60 * 1000;
    return resetToken;
  },
};

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
