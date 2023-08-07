const Task = require("../models/tasks.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const APIFeatures = require("../utils/apiFeatures");

const getTasks = async (query) => {
  const tasks = new APIFeatures(Task.find(), query).filter().sort().paginate();

  return tasks.query;
};

const getTask = async (taskId) => {
  const task = await Task.findById(taskId)
    .populate("madeBy", "name -_id")
    .populate("test", "nameTest -_id");
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found!");
  }

  return task;
};

const createTask = async (newTask) => {
  if (!newTask.content || !newTask.madeBy) {
    throw new ApiError(httpStatus.BAD_REQUEST,"Test's information is not enough!");
  }
  
  const existedTask = await Task.findOne({ test: newTask.test, madeBy:newTask.madeBy});
  if (existedTask) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This task already exists!");
  }

  const task = await Task.create(newTask);

  return task;
};

const updateTask = async (taskId, updateTask) => {
  const task = await Task.findByIdAndUpdate(
    taskId,
    updateTask
  );
  if (!task) {
    throw new ApiError(httpStatus.NOTFOUND, "Task not found!");
  }

  return task;
};

const deleteTask = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOTFOUND, "Task not found!");
  }

  return task;
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
