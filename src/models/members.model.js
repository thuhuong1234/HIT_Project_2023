const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
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
    studentCode: {
      type: String,
      required: true,
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

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
