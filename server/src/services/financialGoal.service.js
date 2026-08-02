
const prisma = require("../config/prisma");

// ==========================================
// GET ALL FINANCIAL GOALS
// ==========================================

async function getGoals(userId) {
  const goals = await prisma.financialGoal.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return goals;
}

// ==========================================
// GET SINGLE FINANCIAL GOAL
// ==========================================

async function getGoalById(userId, goalId) {
  const goal = await prisma.financialGoal.findFirst({
    where: {
      id: goalId,
      userId,
    },
  });

  if (!goal) {
    const error = new Error("Financial goal not found");
    error.statusCode = 404;
    throw error;
  }

  return goal;
}

// ==========================================
// CREATE FINANCIAL GOAL
// ==========================================

async function createGoal(userId, data) {
  const title = String(data?.title || "").trim();

  const targetAmount = Number(data?.targetAmount);

  const savedAmount =
    data?.savedAmount === undefined ||
    data?.savedAmount === null ||
    data?.savedAmount === ""
      ? 0
      : Number(data.savedAmount);

  if (!title) {
    const error = new Error("Goal title is required");
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isFinite(targetAmount) || targetAmount <= 0) {
    const error = new Error(
      "Target amount must be greater than 0"
    );
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isFinite(savedAmount) || savedAmount < 0) {
    const error = new Error(
      "Saved amount cannot be negative"
    );
    error.statusCode = 400;
    throw error;
  }

  if (savedAmount > targetAmount) {
    const error = new Error(
      "Saved amount cannot be greater than target amount"
    );
    error.statusCode = 400;
    throw error;
  }

  const goal = await prisma.financialGoal.create({
    data: {
      title,
      targetAmount,
      savedAmount,
      status: calculateGoalStatus(
        savedAmount,
        targetAmount
      ),
      userId,
    },
  });

  return goal;
}

// ==========================================
// UPDATE FINANCIAL GOAL
// ==========================================

async function updateGoal(userId, goalId, data) {
  const existingGoal = await getGoalById(
    userId,
    goalId
  );

  const updateData = {};

  if (data?.title !== undefined) {
    const title = String(data.title).trim();

    if (!title) {
      const error = new Error("Goal title is required");
      error.statusCode = 400;
      throw error;
    }

    updateData.title = title;
  }

  if (data?.targetAmount !== undefined) {
    const targetAmount = Number(data.targetAmount);

    if (
      !Number.isFinite(targetAmount) ||
      targetAmount <= 0
    ) {
      const error = new Error(
        "Target amount must be greater than 0"
      );
      error.statusCode = 400;
      throw error;
    }

    updateData.targetAmount = targetAmount;
  }

  if (data?.savedAmount !== undefined) {
    const savedAmount = Number(data.savedAmount);

    if (
      !Number.isFinite(savedAmount) ||
      savedAmount < 0
    ) {
      const error = new Error(
        "Saved amount cannot be negative"
      );
      error.statusCode = 400;
      throw error;
    }

    updateData.savedAmount = savedAmount;
  }

  const finalTargetAmount =
    updateData.targetAmount !== undefined
      ? updateData.targetAmount
      : Number(existingGoal.targetAmount);

  const finalSavedAmount =
    updateData.savedAmount !== undefined
      ? updateData.savedAmount
      : Number(existingGoal.savedAmount);

  if (finalSavedAmount > finalTargetAmount) {
    const error = new Error(
      "Saved amount cannot be greater than target amount"
    );
    error.statusCode = 400;
    throw error;
  }

  updateData.status = calculateGoalStatus(
    finalSavedAmount,
    finalTargetAmount
  );

  const goal = await prisma.financialGoal.update({
    where: {
      id: existingGoal.id,
    },
    data: updateData,
  });

  return goal;
}

// ==========================================
// DELETE FINANCIAL GOAL
// ==========================================

async function deleteGoal(userId, goalId) {
  const existingGoal = await getGoalById(
    userId,
    goalId
  );

  await prisma.financialGoal.delete({
    where: {
      id: existingGoal.id,
    },
  });

  return {
    id: existingGoal.id,
  };
}

// ==========================================
// CALCULATE GOAL STATUS
// ==========================================

function calculateGoalStatus(
  savedAmount,
  targetAmount
) {
  if (savedAmount >= targetAmount) {
    return "COMPLETED";
  }

  const progress =
    targetAmount > 0
      ? (savedAmount / targetAmount) * 100
      : 0;

  if (progress >= 75) {
    return "ON_TRACK";
  }

  if (progress >= 40) {
    return "IN_PROGRESS";
  }

  return "STARTED";
}

module.exports = {
  getGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
};

