const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const taskService = require("../services/task.service");


const getTasks = catchAsync(async (req, res) => {
  const tasks = await taskService.getTasks(req.query);

  res.json({
    status: httpStatus.OK,
    data: tasks,
  });
});

const getTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;

  const task = await taskService.getTask(taskId);

  res.json({
    status: httpStatus.OK,
    data: task,
  });
});

const createTask = catchAsync(async (req, res) => {
  const newTask = req.body;
    newTask.content = req.file?.filename;
    newTask.madeBy = req.user.id; 
   
  const task = await taskService.createTask(newTask);

  res.json({
    status: httpStatus.CREATED,
    data: task,
  });
});

const updateTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const updateTask = req.body;
  updateTask.content = req.file?.filename; 
  
  const task = await taskService.updateTask(
    taskId,
    updateTask
  );

  res.json({
    status: httpStatus.OK,
    data: task,
  });
});

const deleteTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  
  const task = await taskService.deleteTask(taskId);

  res.json({
    status: httpStatus.OK,
    data: task,
  });
});

module.exports={
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}