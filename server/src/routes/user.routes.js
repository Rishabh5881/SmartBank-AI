const express = require("express");

const router = express.Router();

// =====================================
// MIDDLEWARE
// =====================================

const {
  authenticate,
} = require("../middlewares/auth.middleware");

// =====================================
// CONTROLLERS
// =====================================

const {
  getProfileController,
  updateProfileController,
  getSecurityOverviewController,
} = require("../controllers/user.controller");

// =====================================
// USER PROFILE ROUTES
// =====================================

// -------------------------------------
// GET PROFILE
// GET /api/users/profile
// -------------------------------------

router.get(
  "/profile",
  authenticate,
  getProfileController
);

// -------------------------------------
// UPDATE PROFILE
// PUT /api/users/profile
// -------------------------------------

router.put(
  "/profile",
  authenticate,
  updateProfileController
);

// =====================================
// SECURITY OVERVIEW
// =====================================

// -------------------------------------
// GET SECURITY OVERVIEW
// GET /api/users/security
// -------------------------------------

router.get(
  "/security",
  authenticate,
  getSecurityOverviewController
);

// =====================================
// EXPORT
// =====================================

module.exports = router;