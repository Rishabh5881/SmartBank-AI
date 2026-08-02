const goalService = require("../services/goal.service");

// =====================
// GET ALL GOALS
// =====================

async function getGoalsController(req, res, next) {
  try {
    const goals = await goalService.getGoals(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: goals,
    });
  } catch (err) {
    next(err);
  }
}

// =====================
// GET SINGLE GOAL
// =====================

async function getGoalByIdController(req, res, next) {
  try {
    const goal = await goalService.getGoalById(
      req.user.id,
      req.params.goalId
    );

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (err) {
    next(err);
  }
}

// =====================
// CREATE GOAL
// =====================

async function createGoalController(req, res, next) {
  try {
    const goal = await goalService.createGoal(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Financial goal created successfully",
      data: goal,
    });
  } catch (err) {
    next(err);
  }
}

// =====================
// UPDATE GOAL
// =====================

async function updateGoalController(req, res, next) {
  try {
    const goal = await goalService.updateGoal(
      req.user.id,
      req.params.goalId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Financial goal updated successfully",
      data: goal,
    });
  } catch (err) {
    next(err);
  }
}

// =====================
// DELETE GOAL
// =====================

async function deleteGoalController(req, res, next) {
  try {
    const result = await goalService.deleteGoal(
      req.user.id,
      req.params.goalId
    );

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        id: result.id,
      },
    });
  } catch (err) {
    next(err);
  }
}

// =====================
// EXPORTS
// =====================

module.exports = {
  getGoalsController,
  getGoalByIdController,
  createGoalController,
  updateGoalController,
  deleteGoalController,
};