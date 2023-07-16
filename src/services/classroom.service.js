const Classroom = require("../models/classroom.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const APIFeatures = require("../utils/apiFeatures");

const getClassrooms = async (query) => {
  const classrooms = new APIFeatures(Classroom.find(), query)
    .populate("leader")
    .filter()
    .sort()
    .paginate();
  return classrooms.query;
};

const getClassroom = async (classroomId) => {
  const classroom = await Classroom.findById(classroomId);
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
  const classroom = await Classroom.create(newClassroom);
  return classroom;
};

const updateClassroom = async (classroomId, updateClassroom) => {};

const deleteClassroom = async () => {};

module.exports = {
  getClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
};
