const accountService = require("../services/account.service");

// POST /api/v1/accounts
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

// GET /api/v1/accounts
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

// GET /api/v1/accounts/:id
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

module.exports = {
  createAccountController,
  getAccountsController,
  getAccountByIdController,
};