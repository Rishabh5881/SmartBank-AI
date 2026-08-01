
const express = require("express");

const router = express.Router();

const {
  signupController,
  loginController,
  googleLoginController,
  forgotPasswordController,
  resetPasswordController,
  refreshController,
  logoutController,
  getMeController,
} = require("../controllers/auth.controller");

const {
  authenticate,
} = require("../middlewares/auth.middleware");

// ==============================
// AUTH ROUTES
// ==============================

// ==============================
// SIGNUP
// ==============================

router.post(
  "/signup",
  signupController
);

// ==============================
// LOGIN
// ==============================

router.post(
  "/login",
  loginController
);

// ==============================
// GOOGLE LOGIN
// ==============================

router.post(
  "/google",
  googleLoginController
);

// ==============================
// FORGOT PASSWORD
// ==============================

router.post(
  "/forgot-password",
  forgotPasswordController
);

// ==============================
// RESET PASSWORD
// ==============================

router.post(
  "/reset-password",
  resetPasswordController
);

// ==============================
// REFRESH ACCESS TOKEN
// ==============================

router.post(
  "/refresh",
  refreshController
);

// ==============================
// LOGOUT
// ==============================

router.post(
  "/logout",
  logoutController
);

// ==============================
// CURRENT USER PROFILE
// PROTECTED ROUTE
// ==============================

router.get(
  "/me",
  authenticate,
  getMeController
);

// ==============================
// EXPORT ROUTER
// ==============================

module.exports = router;

