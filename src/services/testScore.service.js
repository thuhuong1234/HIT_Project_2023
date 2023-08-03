const TestScore = require("../models/testScores.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const APIFeatures = require("../utils/apiFeatures");

const getTestScores = async (query) => {
  const testScores = new APIFeatures(TestScore.find(), query).filter().sort().paginate();

  return testScores.query;
};

const getTestScore = async (testScoreId) => {
  const testScore = await TestScore.findById(testScoreId)
    .populate("member scoredBy", "name -_id")
    .populate("test", "nameTest -_id")
    .populate("comments","content -_id");
    
  if (!testScore) {
    throw new ApiError(httpStatus.NOT_FOUND, "Test score not found!");
  }

  return testScore;
};

const createTestScore = async (newTestScore) => {
  if (!newTestScore.score || !newTestScore.member) {
    throw new ApiError(httpStatus.BAD_REQUEST,"Test Score's information is not enough!");
  }

  const testScore = await TestScore.create(newTestScore);
  return testScore;
};

const updateTestScore = async (testScoreId, updateTestScore) => {
  const testScore = await TestScore.findByIdAndUpdate(
    testScoreId,
    updateTestScore
  );
  if (!testScore) {
    throw new ApiError(httpStatus.NOTFOUND, "Test score not found!");
  }

  return testScore;
};

const deleteTestScore = async (testScoreId) => {
  const testScore = await TestScore.findByIdAndDelete(testScoreId);
  if (!testScore) {
    throw new ApiError(httpStatus.NOTFOUND, "Test score not found!");
  }

  return testScore;
};

module.exports = {
  getTestScores,
  getTestScore,
  createTestScore,
  updateTestScore,
  deleteTestScore,
};
