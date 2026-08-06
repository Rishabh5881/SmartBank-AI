const adminLoanService = require("../services/adminLoan.service");

// ==========================================
// GET PENDING LOANS
// ==========================================

async function getPendingLoansController(
  req,
  res,
  next
) {
  try {
    const loans =
      await adminLoanService.getPendingLoans();

    res.status(200).json({
      success: true,
      message: "Pending loans fetched successfully",
      data: loans,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// GET ALL ADMIN LOANS
// ==========================================

async function getAllAdminLoansController(
  req,
  res,
  next
) {
  try {
    const loans =
      await adminLoanService.getAllAdminLoans();

    res.status(200).json({
      success: true,
      message: "All loans fetched successfully",
      data: loans,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// GET SINGLE ADMIN LOAN
// ==========================================

async function getAdminLoanController(
  req,
  res,
  next
) {
  try {
    const loan =
      await adminLoanService.getAdminLoanById(
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
// APPROVE LOAN
// ==========================================

async function approveLoanController(
  req,
  res,
  next
) {
  try {
    const loan =
      await adminLoanService.approveLoan(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: "Loan approved successfully",
      data: loan,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// REJECT LOAN
// ==========================================

async function rejectLoanController(
  req,
  res,
  next
) {
  try {
    const loan =
      await adminLoanService.rejectLoan(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: "Loan rejected successfully",
      data: loan,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  getPendingLoansController,
  getAllAdminLoansController,
  getAdminLoanController,
  approveLoanController,
  rejectLoanController,
};