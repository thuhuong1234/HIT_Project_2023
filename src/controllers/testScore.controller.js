const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const testScoreService = require("../services/testScore.service");

const getTestScores = catchAsync(async (req, res) => {
  const testScores = await testScoreService.getTestScores(req.query);

  res.json({
    status: httpStatus.OK,
    data: testScores,
  });
});

const getTestScore = catchAsync(async (req, res) => {
  const { testScoreId } = req.params;

  const testScore = await testScoreService.getTestScore(testScoreId);

  res.json({
    status: httpStatus.OK,
    data: testScore,
  });
});

const createTestScore = catchAsync(async (req, res) => {
  const newTestScore = req.body;

  const testScore = await testScoreService.createTestScore(newTestScore);

  res.json({
    status: httpStatus.CREATED,
    data: testScore,
  });
});

const updateTestScore = catchAsync(async (req, res) => {
  const { testScoreId } = req.params;
  const updateTestScore = req.body;

  const testScore = await testScoreService.updateTestScore(
    testScoreId,
    updateTestScore
  );

  res.json({
    status: httpStatus.OK,
    data: testScore,
  });
});

const deleteTestScore = catchAsync(async (req, res) => {
  const { testScoreId } = req.params;
  
  const testScore = await testScoreService.deleteTest(testScoreId);

  res.json({
    status: httpStatus.OK,
    data: testScore,
  });
});

module.exports = {
    getTestScores,
    getTestScore,
    createTestScore,
    updateTestScore,
    deleteTestScore,
};
