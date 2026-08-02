import api from "./axios";

// ==========================================
// USER PROFILE
// ==========================================

export const getProfile = async () => {
  const response = await api.get("/users/profile");

  return response.data;
};

// ==========================================
// ACCOUNTS
// ==========================================

export const getAccounts = async () => {
  const response = await api.get("/accounts");

  return response.data;
};

// ==========================================
// TRANSACTIONS
// ==========================================

export const getTransactions = async () => {
  const response = await api.get("/transactions");

  return response.data;
};

// ==========================================
// FINANCIAL GOALS
// ==========================================

export const getGoals = async () => {
  const response = await api.get("/goals");

  return response.data;
};

// ==========================================
// GET SINGLE GOAL
// ==========================================

export const getGoalById = async (goalId) => {
  const response = await api.get(
    `/goals/${goalId}`
  );

  return response.data;
};

// ==========================================
// CREATE GOAL
// ==========================================

export const createGoal = async (goalData) => {
  const response = await api.post(
    "/goals",
    goalData
  );

  return response.data;
};

// ==========================================
// UPDATE GOAL
// ==========================================

export const updateGoal = async (
  goalId,
  goalData
) => {
  const response = await api.put(
    `/goals/${goalId}`,
    goalData
  );

  return response.data;
};

// ==========================================
// DELETE GOAL
// ==========================================

export const deleteGoal = async (goalId) => {
  const response = await api.delete(
    `/goals/${goalId}`
  );

  return response.data;
};