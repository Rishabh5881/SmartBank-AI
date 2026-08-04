
const accountService = require("../services/account.service");

// ======================
// CREATE ACCOUNT
// POST /api/accounts
// ======================

async function createAccountController(req, res, next) {
  try {
    const account = await accountService.createAccount(
      req.user.id,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: account,
    });
  } catch (err) {
    next(err);
  }
}

// ======================
// GET ALL ACCOUNTS
// GET /api/accounts
// ======================

async function getAccountsController(req, res, next) {
  try {
    const accounts = await accountService.getAccountsForUser(
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Accounts fetched successfully",
      data: accounts,
    });
  } catch (err) {
    next(err);
  }
}

// ======================
// GET SINGLE ACCOUNT
// GET /api/accounts/:id
// ======================

async function getAccountByIdController(req, res, next) {
  try {
    const account = await accountService.getAccountByIdForUser(
      req.user.id,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Account fetched successfully",
      data: account,
    });
  } catch (err) {
    next(err);
  }
}

// ======================
// DELETE ACCOUNT
// DELETE /api/accounts/number/:accountNumber
// ======================

async function deleteAccountController(req, res, next) {
  try {
    const account =
      await accountService.deleteAccountForUser(
        req.user.id,
        req.params.accountNumber
      );

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
      data: account,
    });
  } catch (err) {
    next(err);
  }
}

// ======================
// EXPORTS
// ======================

module.exports = {
  createAccountController,
  getAccountsController,
  getAccountByIdController,
  deleteAccountController,
};
