const Test = require("../models/tests.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const APIFeatures = require("../utils/apiFeatures");

const getTests = async (query) => {
  const tests = new APIFeatures(Test.find(), query).filter().sort().paginate();

  return tests.query;
};

const getTest = async (testId) => {
  const test = await Test.findById(testId)
    .populate("createdBy", "name -_id")
    .populate("unit", "nameUnit -_id");
  if (!test) {
    throw new ApiError(httpStatus.NOT_FOUND, "Test not found!");
  }

  return test;
};

const createTest = async (newTest) => {
  if (!newTest.content || !newTest.nameTest) {
    throw new ApiError(httpStatus.BAD_REQUEST,"Test's information is not enough!");
  }
  
  const existedTest = await Test.findOne({ nameTest: newTest.nameTest });
  if (existedTest) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Name test already exists!");
  }

  const test = await Test.create(newTest);
  return test;
};

const updateTest = async (testId, updateTest) => {
  const test = await Test.findByIdAndUpdate(
    testId,
    updateTest
  );
  if (!test) {
    throw new ApiError(httpStatus.NOTFOUND, "Test not found!");
  }

  return test;
};

const deleteTest = async (testId) => {
  const test = await Test.findByIdAndDelete(testId);
  if (!test) {
    throw new ApiError(httpStatus.NOTFOUND, "Test not found!");
  }

  return test;
};

module.exports = {
  getTests,
  getTest,
  createTest,
  updateTest,
  deleteTest,
};
