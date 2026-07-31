const express = require("express");

const {
  createAccountController,
  getAccountsController,
  getAccountByIdController,
} = require("../controllers/account.controller");

const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

// All account routes require a logged-in user
router.use(authenticate);

router.post(
  "/",
  createAccountController
);

router.get(
  "/",
  getAccountsController
);

router.get(
  "/:id",
  getAccountByIdController
);

module.exports = router;