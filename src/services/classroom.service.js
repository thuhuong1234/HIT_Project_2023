const Classroom = require("../models/classrooms.model");
const Member = require("../models/members.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const APIFeatures = require("../utils/apiFeatures");
const ExcelJS = require("exceljs");

const getClassrooms = async (query) => {
  const classrooms = new APIFeatures(Classroom.find(), query)
    .filter()
    .sort()
    .paginate();

  return classrooms.query;
};

const getClassroom = async (classroomId) => {
  const classroom = await Classroom.findById(classroomId)
    .populate("leaders", "name email -_id")
    .populate("supports", "name email -_id")
    .populate("members", "name email -_id")
    .populate("units", "nameUnit -_id");
  if (!classroom) {
    throw new ApiError(httpStatus.NOT_FOUND, "Classroom not found!");
  }

  return classroom;
};

const createClassroom = async (newClassroom) => {
  if (!newClassroom.className || !newClassroom.description) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Classroom's information is not enough!"
    );
  }
  if (await Classroom.findOne({ className: newClassroom.className })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "className already exists!");
  }
  if (!newClassroom.leaders.role === "leader") {
    throw new ApiError(httpStatus.BAD_REQUEST, "Leader is not correct!");
  }
  if (!newClassroom.supports.role === "support") {
    throw new ApiError(httpStatus.BAD_REQUEST, "Support is not correct!");
  }
  const classroom = await Classroom.create(newClassroom);

  return classroom;
};

const updateClassroom = async (classroomId, updateClassroom) => {
  const classroom = await Classroom.findByIdAndUpdate(
    classroomId,
    updateClassroom
  );
  if (!classroom) {
    throw new ApiError(httpStatus.NOTFOUND, "Classroom not found!");
  }

  return classroom;
};

const deleteClassroom = async (classroomId) => {
  const classroom = await Classroom.findByIdAndDelete(classroomId);
  if (!classroom) {
    throw new ApiError(httpStatus.NOTFOUND, "Classroom not found!");
  }

  return classroom;
};

const addMemberToClassroom = async (classroomId, role, memberId) => {
  //check valid role
  if (!["leader", "support", "member"].includes(role)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid role!");
  }

  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    throw new ApiError(httpStatus.NOT_FOUND, "Classroom not found!");
  }

  //check if member exist in classroom
  const isExistInClassroom = classroom[`${role}s`].includes(memberId);
  if (isExistInClassroom) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      `Member as ${role} exists in classroom`
    );
  }

  //check quality is full
  const count = classroom.members.filter((member) => Boolean(member)).length;
  if (count === classroom.quality) {
    throw new ApiError(httpStatus.NOT_FOUND, "Classroom is full!");
  }

  //add member to classroom
  classroom[`${role}s`].push(memberId);
  const addMemberToClassroom = await classroom.save();

  return addMemberToClassroom;
};

const deleteMemberFromClassroom = async (classroomId, role, memberId) => {
  //check valid role
  if (!["leader", "support", "member"].includes(role)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid role!");
  }

  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    throw new ApiError(httpStatus.NOT_FOUND, "Classroom not found!");
  }

  //check if member exist in classroom
  const isExistInClassroom = classroom[`${role}s`].includes(memberId);
  if (!isExistInClassroom) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      `Member as ${role} don't exist in classroom`
    );
  }

  //delete member from classroom
  classroom[`${role}s`].remove(memberId);
  const deleteMemberFromClassroom = await classroom.save();

  return deleteMemberFromClassroom;
};

const getNameMember = async (classroom) => {
  let members = [];
  for (let memberId of classroom.members) {
    const member = await Member.findById(memberId);
    members.push(member.name);
  }
  console.log(members.join("-"));
  return members.join("-");
};

const exportClassroomToExcelFile = async () => {
  const classrooms = await Classroom.find();
  classrooms.forEach(async (classroom) => {
    const members = [];
    for (const memberId of classroom.members) {
      const member = await Classroom.findOne({ members: memberId });
      members.push(member);
    }
    return members;
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Classroom");
  sheet.columns = [
    { header: "ClassName", key: "className", width: 20 },
    { header: "Description", key: "description", width: 30 },
    { header: "Leaders", key: "leaders", width: 50 },
    { header: "Supports", key: "supports", width: 10 },
    { header: "Members", key: "members", width: 10 },
    { header: "Units", key: "units", width: 10 },
  ];
  classrooms.forEach((classroom) => {
    sheet.addRow({
      className: classroom.className,
      description: classroom.description,
      leaders: classroom.leaders,
      supports: classroom.supports,
      members: getNameMember(classroom),
      units: classroom.units,
    });
  });

  const filePath = "./uploads/classrooms.xlsx";
  await workbook.xlsx.writeFile(filePath);

  return filePath;
};

module.exports = {
  getClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  addMemberToClassroom,
  deleteMemberFromClassroom,
  exportClassroomToExcelFile,
};
