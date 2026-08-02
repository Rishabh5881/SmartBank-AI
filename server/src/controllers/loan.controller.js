const loanService = require("../services/loan.service");

// ==========================================
// GET ALL LOANS
// ==========================================

async function getLoansController(req, res, next) {
  try {
    const loans = await loanService.getUserLoans(
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Loans fetched successfully",
      data: loans,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// GET ACTIVE LOANS
// ==========================================

async function getActiveLoansController(req, res, next) {
  try {
    const loans = await loanService.getActiveLoans(
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Active loans fetched successfully",
      data: loans,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// GET LOAN SUMMARY
// ==========================================

async function getLoanSummaryController(req, res, next) {
  try {
    const summary = await loanService.getLoanSummary(
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Loan summary fetched successfully",
      data: summary,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// GET SINGLE LOAN
// ==========================================

async function getLoanController(req, res, next) {
  try {
    const loan = await loanService.getLoanById(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Loan fetched successfully",
      data: loan,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// CREATE LOAN
// ==========================================

async function createLoanController(req, res, next) {
  try {
    const loan = await loanService.createLoan(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Loan created successfully",
      data: loan,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// UPDATE LOAN
// ==========================================

async function updateLoanController(req, res, next) {
  try {
    const loan = await loanService.updateLoan(
      req.user.id,
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Loan updated successfully",
      data: loan,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// DELETE LOAN
// ==========================================

async function deleteLoanController(req, res, next) {
  try {
    const result = await loanService.deleteLoan(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Loan deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  getLoansController,
  getActiveLoansController,
  getLoanSummaryController,
  getLoanController,
  createLoanController,
  updateLoanController,
  deleteLoanController,
};