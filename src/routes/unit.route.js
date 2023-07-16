const express = require("express");

const {
  getUnits,
  createUnit,
  getUnit,
  updateUnit,
  deleteUnit,
} = require("../controllers/unit.controller");
const roles = require("../middleware/role.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const UnitRouter = express.Router();

UnitRouter.use(authMiddleware);
UnitRouter.route("/").get(getUnits);

UnitRouter.route("/:unitId").get(getUnit);

UnitRouter.use(roles(["leader"]));

UnitRouter.route("/").post(createUnit);
UnitRouter.route("/:unitId").put(updateUnit).delete(deleteUnit);

module.exports = UnitRouter;
