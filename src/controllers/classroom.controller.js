const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const classroomService = require("../services/classroom.service");

const getClassrooms = catchAsync(async (req, res) => {
    const classrooms = await classroomService.getClassrooms(req.query);
    res.json({
      status: httpStatus.OK,
      data: classrooms,
    });
});

const getClassroom = catchAsync(async (req, res) => {
    const { classroomId } = req.params;
    const classroom = await classroomService.getClassroom(classroomId);
  
    res.json({
      status: httpStatus.OK,
      data: classroom,
    });
});

const createClassroom = catchAsync(async (req, res) => {
    const newClassroom = req.body;
    const classroom = await classroomService.createClassroom(newClassroom);
    res.json({
      status: httpStatus.CREATED,
      data: classroom,
    });
});

const updateClassroom = catchAsync(async (req, res) => {
    const { classroomId } = req.params;
  const updateClassroom = req.body;
  const classroom = await classroomService.updateClassroom(classroomId, updateClassroom);
  res.json({
    status: httpStatus.OK,
    data: classroom,
  });
});

const deleteClassroom = catchAsync(async (req, res) => {
    const { classroomId } = req.params;
    const classroom = await classroomService.deleteClassroom(classroomId);
    res.json({
      status: httpStatus.OK,
      data: classroom,
    });
});

module.exports = {
  getClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
};
