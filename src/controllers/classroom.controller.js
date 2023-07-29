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

  const classroom = await classroomService.updateClassroom(
    classroomId,
    updateClassroom
  );

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

const addMemberToClassroom = catchAsync(async (req, res) => {
  const {classroomId} = req.params;
  const {role, memberId} = req.query;

  const addMemberToClassroom = await classroomService.addMemberToClassroom(classroomId, role, memberId);

  res.json({
    status:httpStatus.CREATED,
    message:`Member added as ${role} to classroom`,
    date:addMemberToClassroom
  })
});

const deleteMemberFromClassroom = catchAsync(async (req, res) => {
  const {classroomId} = req.params;
  const {role, memberId} = req.query;

  const deleteMemberFromClassroom = await classroomService.deleteMemberFromClassroom(classroomId, role, memberId);

  res.json({
    status:httpStatus.CREATED,
    message:`Member added as ${role} to classroom`,
    date:deleteMemberFromClassroom
  })
});

const exportClassroomToExcelFile = catchAsync(async (req, res) => {
  const excelFile = await classroomService.exportClassroomToExcelFile();
  
  res.download(excelFile)

}); 
module.exports = {
  getClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  addMemberToClassroom,
  deleteMemberFromClassroom,
  exportClassroomToExcelFile
};
