
const express = require("express");

const {
  getGoalsController,
  getGoalByIdController,
  createGoalController,
  updateGoalController,
  deleteGoalController,
} = require("../controllers/goal.controller");

const {
  authenticate: authMiddleware,
} = require("../middlewares/auth.middleware");

const router = express.Router();

// =====================
// GET ALL GOALS
// =====================

router.get(
  "/",
  authMiddleware,
  getGoalsController
);

// =====================
// GET SINGLE GOAL
// =====================

router.get(
  "/:goalId",
  authMiddleware,
  getGoalByIdController
);

// =====================
// CREATE GOAL
// =====================

router.post(
  "/",
  authMiddleware,
  createGoalController
);

// =====================
// UPDATE GOAL
// =====================

router.put(
  "/:goalId",
  authMiddleware,
  updateGoalController
);

// =====================
// DELETE GOAL
// =====================

router.delete(
  "/:goalId",
  authMiddleware,
  deleteGoalController
);

module.exports = router;

