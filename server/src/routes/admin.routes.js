const express = require("express");

const {
  getAdminOverviewController,
  getAdminCustomersController,
  getAdminActivityController,
  getAdminCustomerController,
} = require("../controllers/admin.controller");

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

// =====================================
// ALL ADMIN ROUTES
// REQUIRE LOGIN + ADMIN ROLE
// =====================================

router.use(authenticate);
router.use(requireAdmin);

// =====================================
// ADMIN OVERVIEW
// GET /api/admin/overview
// =====================================

router.get(
  "/overview",
  getAdminOverviewController
);

// =====================================
// ADMIN CUSTOMERS
// GET /api/admin/customers
// =====================================

router.get(
  "/customers",
  getAdminCustomersController
);

// =====================================
// ADMIN RECENT ACTIVITY
// GET /api/admin/activity
// =====================================

router.get(
  "/activity",
  getAdminActivityController
);

// =====================================
// ADMIN CUSTOMER DETAILS
// GET /api/admin/customers/:userId
// =====================================

router.get(
  "/customers/:userId",
  getAdminCustomerController
);

// =====================================
// ADMIN LOANS
// =====================================

// GET /api/admin/loans/pending
router.get(
  "/loans/pending",
  getPendingLoansController
);

// GET /api/admin/loans
router.get(
  "/loans",
  getAllAdminLoansController
);

// GET /api/admin/loans/:id
router.get(
  "/loans/:id",
  getAdminLoanController
);

// PATCH /api/admin/loans/:id/approve
router.patch(
  "/loans/:id/approve",
  approveLoanController
);

// PATCH /api/admin/loans/:id/reject
router.patch(
  "/loans/:id/reject",
  rejectLoanController
);

// =====================================
// EXPORT
// =====================================

module.exports = router;

