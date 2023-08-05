const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const Unit = require("../models/units.model");
const unitService = require("../services/unit.service");

const getUnits = catchAsync(async (req, res) => {
  const units = await unitService.getUnits(req.query);

  res.json({
    status: httpStatus.OK,
    data: units,
  });
});

const getUnit = catchAsync(async (req, res) => {
  const { unitId } = req.params;

  const unit = await unitService.getUnit(unitId);

  res.json({
    status: httpStatus.OK,
    data: unit,
  });
});

const createUnit = catchAsync(async (req, res) => {
  const newUnit = req.body;
  const video = req.file?.path;
  const unit = await unitService.createUnit(newUnit, video);

  res.json({
    status: httpStatus.OK,
    data: unit,
  });
});

const updateUnit = catchAsync(async (req, res) => {
  const { unitId } = req.params;
  const updateUnit = req.body;
  const video = req.file?.path;

  const unit = await unitService.updateUnit(unitId, updateUnit, video);

  res.json({
    status: httpStatus.OK,
    data: unit,
  });
});

const deleteUnit = catchAsync(async (req, res) => {
  const { unitId } = req.params;

  const unit = await unitService.deleteUnit(unitId);

  res.json({
    status: httpStatus.OK,
    data: unit,
  });
});

module.exports = {
  getUnits,
  createUnit,
  getUnit,
  updateUnit,
  deleteUnit,
};
