const Classroom = require("../models/classrooms.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const APIFeatures = require("../utils/apiFeatures");

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
  if (!newClassroom.leader.role === "leader") {
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

  //add member to classroom
  classroom[`${role}s`].push(memberId);
  const addMemberToClassroom = await classroom.save();

  return addMemberToClassroom;
};

const deleteMemberFromClassroom = async (classroomId,role, memberId) => {
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

module.exports = {
  getClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  addMemberToClassroom,
  deleteMemberFromClassroom,
};
