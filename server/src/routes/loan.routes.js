const express = require("express");

const {
  getLoansController,
  getActiveLoansController,
  getLoanSummaryController,
  getLoanController,
  createLoanController,
  updateLoanController,
  deleteLoanController,
} = require("../controllers/loan.controller");

const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

// ==========================================
// ALL LOAN ROUTES REQUIRE AUTHENTICATION
// ==========================================

router.use(authenticate);

// ==========================================
// GET ALL LOANS
// GET /api/loans
// ==========================================

router.get(
  "/",
  getLoansController
);

// ==========================================
// GET ACTIVE LOANS
// GET /api/loans/active
// ==========================================

router.get(
  "/active",
  getActiveLoansController
);

// ==========================================
// GET LOAN SUMMARY
// GET /api/loans/summary
// ==========================================

router.get(
  "/summary",
  getLoanSummaryController
);

// ==========================================
// GET SINGLE LOAN
// GET /api/loans/:id
// ==========================================

router.get(
  "/:id",
  getLoanController
);

// ==========================================
// CREATE LOAN
// POST /api/loans
// ==========================================

router.post(
  "/",
  createLoanController
);

// ==========================================
// UPDATE LOAN
// PUT /api/loans/:id
// ==========================================

router.put(
  "/:id",
  updateLoanController
);

// ==========================================
// DELETE LOAN
// DELETE /api/loans/:id
// ==========================================

router.delete(
  "/:id",
  deleteLoanController
);

module.exports = router;