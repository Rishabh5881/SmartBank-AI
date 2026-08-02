const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

// =====================
// VALIDATE USER ID
// =====================

function assertUserId(userId) {
  if (!userId) {
    throw ApiError.badRequest("User ID is required");
  }
}

// =====================
// VALIDATE GOAL TITLE
// =====================

function assertValidTitle(title) {
  if (
    title === undefined ||
    title === null ||
    typeof title !== "string" ||
    title.trim().length === 0
  ) {
    throw ApiError.badRequest("Goal title is required");
  }

  if (title.trim().length > 100) {
    throw ApiError.badRequest(
      "Goal title must not exceed 100 characters"
    );
  }

  return title.trim();
}

// =====================
// VALIDATE AMOUNT
// =====================

function assertValidAmount(amount, fieldName) {
  const numericAmount = Number(amount);

  if (
    amount === undefined ||
    amount === null ||
    Number.isNaN(numericAmount) ||
    !Number.isFinite(numericAmount) ||
    numericAmount <= 0
  ) {
    throw ApiError.badRequest(
      `${fieldName} must be a positive number`
    );
  }

  return numericAmount;
}

// =====================
// VALIDATE STATUS
// =====================

function normalizeStatus(status) {
  if (
    status === undefined ||
    status === null ||
    status === ""
  ) {
    return "IN_PROGRESS";
  }

  if (typeof status !== "string") {
    throw ApiError.badRequest("Goal status must be a string");
  }

  const normalizedStatus = status.trim().toUpperCase();

  const allowedStatuses = [
    "IN_PROGRESS",
    "ON_TRACK",
    "COMPLETED",
    "PAUSED",
  ];

  if (!allowedStatuses.includes(normalizedStatus)) {
    throw ApiError.badRequest(
      "Invalid goal status"
    );
  }

  return normalizedStatus;
}

// =====================
// CALCULATE STATUS
// =====================

function calculateStatus(savedAmount, targetAmount) {
  const saved = Number(savedAmount);
  const target = Number(targetAmount);

  if (saved >= target) {
    return "COMPLETED";
  }

  return "IN_PROGRESS";
}

// =====================
// GET ALL GOALS
// =====================

async function getGoals(userId) {
  assertUserId(userId);

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

// =====================
// GET SINGLE GOAL
// =====================

async function getGoalById(userId, goalId) {
  assertUserId(userId);

  if (!goalId) {
    throw ApiError.badRequest("Goal ID is required");
  }

  const goal = await prisma.financialGoal.findFirst({
    where: {
      id: goalId,
      userId,
    },
  });

  if (!goal) {
    throw ApiError.notFound("Financial goal not found");
  }

  return goal;
}

// =====================
// CREATE GOAL
// =====================

async function createGoal(userId, data) {
  assertUserId(userId);

  if (!data) {
    throw ApiError.badRequest("Goal data missing");
  }

  const {
    title,
    targetAmount,
    savedAmount,
    status,
  } = data;

  const validTitle = assertValidTitle(title);

  const validTargetAmount = assertValidAmount(
    targetAmount,
    "Target amount"
  );

  let validSavedAmount = 0;

  if (
    savedAmount !== undefined &&
    savedAmount !== null &&
    savedAmount !== ""
  ) {
    validSavedAmount = assertValidAmount(
      savedAmount,
      "Saved amount"
    );

    if (validSavedAmount > validTargetAmount) {
      throw ApiError.badRequest(
        "Saved amount cannot be greater than target amount"
      );
    }
  }

  const validStatus = status
    ? normalizeStatus(status)
    : calculateStatus(
        validSavedAmount,
        validTargetAmount
      );

  const goal = await prisma.financialGoal.create({
    data: {
      title: validTitle,
      targetAmount: validTargetAmount,
      savedAmount: validSavedAmount,
      status: validStatus,
      userId,
    },
  });

  return goal;
}

// =====================
// UPDATE GOAL
// =====================

async function updateGoal(userId, goalId, data) {
  assertUserId(userId);

  if (!goalId) {
    throw ApiError.badRequest("Goal ID is required");
  }

  if (!data) {
    throw ApiError.badRequest("Goal data missing");
  }

  const existingGoal =
    await prisma.financialGoal.findFirst({
      where: {
        id: goalId,
        userId,
      },
    });

  if (!existingGoal) {
    throw ApiError.notFound(
      "Financial goal not found"
    );
  }

  const {
    title,
    targetAmount,
    savedAmount,
    status,
  } = data;

  const updateData = {};

  if (title !== undefined) {
    updateData.title = assertValidTitle(title);
  }

  let finalTargetAmount = Number(
    existingGoal.targetAmount
  );

  let finalSavedAmount = Number(
    existingGoal.savedAmount
  );

  if (
    targetAmount !== undefined &&
    targetAmount !== null &&
    targetAmount !== ""
  ) {
    finalTargetAmount = assertValidAmount(
      targetAmount,
      "Target amount"
    );

    updateData.targetAmount = finalTargetAmount;
  }

  if (
    savedAmount !== undefined &&
    savedAmount !== null &&
    savedAmount !== ""
  ) {
    finalSavedAmount = assertValidAmount(
      savedAmount,
      "Saved amount"
    );

    updateData.savedAmount = finalSavedAmount;
  }

  if (finalSavedAmount > finalTargetAmount) {
    throw ApiError.badRequest(
      "Saved amount cannot be greater than target amount"
    );
  }

  if (status !== undefined) {
    updateData.status = normalizeStatus(status);
  } else if (
    targetAmount !== undefined ||
    savedAmount !== undefined
  ) {
    updateData.status = calculateStatus(
      finalSavedAmount,
      finalTargetAmount
    );
  }

  const updatedGoal =
    await prisma.financialGoal.update({
      where: {
        id: goalId,
      },
      data: updateData,
    });

  return updatedGoal;
}

// =====================
// DELETE GOAL
// =====================

async function deleteGoal(userId, goalId) {
  assertUserId(userId);

  if (!goalId) {
    throw ApiError.badRequest("Goal ID is required");
  }

  const existingGoal =
    await prisma.financialGoal.findFirst({
      where: {
        id: goalId,
        userId,
      },
    });

  if (!existingGoal) {
    throw ApiError.notFound(
      "Financial goal not found"
    );
  }

  await prisma.financialGoal.delete({
    where: {
      id: goalId,
    },
  });

  return {
    id: goalId,
    message: "Financial goal deleted successfully",
  };
}

// =====================
// EXPORTS
// =====================

module.exports = {
  getGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
};