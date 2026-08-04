const transactionService = require("../services/transaction.service");

// =====================
// DEPOSIT
// =====================

async function depositController(req, res, next) {
  try {
    const result = await transactionService.deposit(
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Deposit successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

// =====================
// WITHDRAW
// =====================

async function withdrawController(req, res, next) {
  try {
    const result = await transactionService.withdraw(
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Withdrawal successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

// =====================
// TRANSFER
// =====================

async function transferController(req, res, next) {
  try {
    const result = await transactionService.transfer(
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Transfer successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

// =====================
// TRANSACTION HISTORY
// PAGINATION / LIMIT
// =====================

async function getTransactionsController(req, res, next) {
  try {
    const {
      page = 1,
      limit = 10,
    } = req.query;

    const result =
      await transactionService.getTransactions(
        req.user.id,
        page,
        limit
      );

    res.status(200).json({
      success: true,
      message:
        "Transactions fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

// =====================
// EXPORTS
// =====================

module.exports = {
  depositController,
  withdrawController,
  transferController,
  getTransactionsController,
};