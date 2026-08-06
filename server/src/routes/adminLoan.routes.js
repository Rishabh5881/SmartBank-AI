const express = require("express");

const {
  getPendingLoansController,
  getAllAdminLoansController,
  getAdminLoanController,
  approveLoanController,
  rejectLoanController,
} = require("../controllers/adminLoan.controller");

const {
  authenticate,
} = require("../middlewares/auth.middleware");

const {
  requireAdmin,
} = require("../middlewares/admin.middleware");

const router = express.Router();

// ==========================================
// ALL ADMIN LOAN ROUTES
// REQUIRE LOGIN + ADMIN ROLE
// ==========================================

router.use(authenticate);
router.use(requireAdmin);

// ==========================================
// GET PENDING LOANS
// GET /api/admin/loans/pending
// ==========================================

router.get(
  "/pending",
  getPendingLoansController
);

// ==========================================
// GET ALL LOANS
// GET /api/admin/loans
// ==========================================

router.get(
  "/",
  getAllAdminLoansController
);

// ==========================================
// GET SINGLE LOAN
// GET /api/admin/loans/:id
// ==========================================

router.get(
  "/:id",
  getAdminLoanController
);

// ==========================================
// APPROVE LOAN
// PATCH /api/admin/loans/:id/approve
// ==========================================

router.patch(
  "/:id/approve",
  approveLoanController
);

// ==========================================
// REJECT LOAN
// PATCH /api/admin/loans/:id/reject
// ==========================================

router.patch(
  "/:id/reject",
  rejectLoanController
);

// ==========================================
// EXPORT
// ==========================================

module.exports = router;