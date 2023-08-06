const Member = require("../models/members.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const APIFeatures = require("../utils/apiFeatures");
const ExcelJS = require("exceljs");

const getMembers = async (query) => {
  const feature = new APIFeatures(
    Member.find().select("-password -refreshToken"),
    query
  )
    .filter()
    .sort()
    .paginate();
  return feature.query;
};

const getMember = async (memberId) => {
  const member = await Member.findById(memberId).select(
    "-password -refreshToken"
  );
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found!");
  }

  return member;
};

const createMember = async (newMember) => {
  if (
    !newMember.name ||
    !newMember.password ||
    !newMember.studentCode ||
    !newMember.email ||
    !newMember.phoneNumber
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Member's information is not enough!"
    );
  }
  if (await Member.findOne({ studentCode: newMember.studentCode })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "StudentCode already exists!");
  }
  if (await Member.isEmailTaken(newMember.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken!");
  }

  const member = await Member.create(newMember);

  return member;
};

const updateMember = async (memberId, updateMember) => {
  const member = await Member.findByIdAndUpdate(memberId, updateMember);
  if (!member) {
    throw new ApiError(httpStatus.NOTFOUND, "Member not found!");
  }

  return member;
};

const deleteMember = async (memberId) => {
  const member = await Member.findByIdAndDelete(memberId);
  if (!member) {
    throw new ApiError(httpStatus.NOTFOUND, "Member not found!");
  }

  return member;
};

const exportMembersToExcelFile = async () => {
  const members = await Member.find();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(
    "Member",{headerFooter:{firstHeader: "Members", firstFooter: "Hello World"}}
  );
  sheet.columns = [
    { header: "StudentCode", key: "studentCode", width: 20 },
    { header: "Name", key: "name", width: 30 },
    { header: "Email", key: "email", width: 50 },
    { header: "Role", key: "role", width: 10 },
  ];
  members.forEach((member) => {
    sheet.addRow({
      studentCode: member.studentCode,
      name: member.name,
      email: member.email,
      role: member.role,
    });
  });

  const filePath = "./uploads/members.xlsx";
  await workbook.xlsx.writeFile(filePath);

  return filePath;
};
module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  exportMembersToExcelFile,
};
