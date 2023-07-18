const Unit = require("../models/units.model");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const APIFeatures = require("../utils/apiFeatures");

const getUnits = async (query) => {
  const feature = new APIFeatures(Unit.find(), query)
    .filter()
    .sort()
    .paginate();

  return feature.query;
};

const getUnit = async (unitId) => {
  const unit = await Unit.findById(unitId);
  if (!unit) {
    throw new ApiError(httpStatus.NOT_FOUND, "Unit not found!");
  }
  return unit;
};

const createUnit = async (newUnit) => {
  if (!newUnit.nameUnit) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Name unit is require!");
  }

  const existedUnit = await Unit.findOne({ nameUnit: newUnit.nameUnit });
  if (existedUnit) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Name unit already exists!");
  }

  const unit = await Unit.create(newUnit);
  return unit;
};

const updateUnit = async (unitId, updateUnit) => {
  const existedUnit = await Unit.findOne({
    nameUnit: updateUnit.nameUnit,
    _id: { $ne: unitId },
  });

  if (existedUnit) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Name unit already exists!");
  }

  const unit = await Unit.findByIdAndUpdate(unitId, updateUnit, {
    new: true,
  });
  if (!unit) {
    throw new ApiError(httpStatus.NOTFOUND, "unit not found!");
  }

  return unit;
};

const deleteUnit = async (unitId) => {
  const unit = await Unit.findByIdAndDelete(unitId);

  if (!unit) {
    throw new ApiError(httpStatus.NOTFOUND, "Unit not found!");
  }
  return unit;
};
module.exports = {
  getUnits,
  getUnit,
  createUnit,
  updateUnit,
  deleteUnit,
};
