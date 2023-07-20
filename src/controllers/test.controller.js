const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const testService = require("../services/test.service");


const getTests = catchAsync(async (req, res) => {
  const tests = await testService.getTests(req.query);

  res.json({
    status: httpStatus.OK,
    data: tests,
  });
});

const getTest = catchAsync(async (req, res) => {
  const { testId } = req.params;

  const test = await testService.getTest(testId);

  res.json({
    status: httpStatus.OK,
    data: test,
  });
});

const createTest = catchAsync(async (req, res) => {
  const newTest = req.body;

  const test = await testService.createTest(newTest);

  res.json({
    status: httpStatus.CREATED,
    data: test,
  });
});

const updateTest = catchAsync(async (req, res) => {
  const { testId } = req.params;
  const updateTest = req.body;

  const test = await testService.updateTest(
    testId,
    updateTest
  );

  res.json({
    status: httpStatus.OK,
    data: test,
  });
});

const deleteTest = catchAsync(async (req, res) => {
  const { testId } = req.params;
  
  const test = await testService.deleteTest(testId);

  res.json({
    status: httpStatus.OK,
    data: test,
  });
});

module.exports = {
  getTests,
  getTest,
  createTest,
  updateTest,
  deleteTest,
};
