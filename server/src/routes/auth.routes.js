const express = require("express");

const router = express.Router();


const {
  signupController,
  loginController,
  refreshController,
  logoutController,
  getMeController,
} = require("../controllers/auth.controller");


const {
  authenticate
} = require("../middlewares/auth.middleware");



// ==============================
// AUTH ROUTES
// ==============================


// Signup
router.post(
  "/signup",
  signupController
);



// Login
router.post(
  "/login",
  loginController
);



// Refresh Access Token
router.post(
  "/refresh",
  refreshController
);



// Logout
router.post(
  "/logout",
  logoutController
);



// Current User Profile
// Protected Route
router.get(
  "/me",
  authenticate,
  getMeController
);



module.exports = router;