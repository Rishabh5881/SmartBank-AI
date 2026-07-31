const express = require("express");


const {
  depositController,
  withdrawController,
  transferController,
  getTransactionsController,
} = require("../controllers/transaction.controller");


const { authenticate } = require("../middlewares/auth.middleware");


const validate = require("../middlewares/validate.middleware");


const {
  depositSchema,
  withdrawSchema,
  transferSchema,
} = require("../validators/transaction.validation");



const router = express.Router();



// =====================
// DEPOSIT
// =====================

router.post(
  "/deposit",
  authenticate,
  validate(depositSchema),
  depositController
);



// =====================
// WITHDRAW
// =====================

router.post(
  "/withdraw",
  authenticate,
  validate(withdrawSchema),
  withdrawController
);



// =====================
// TRANSFER
// =====================

router.post(
  "/transfer",
  authenticate,
  validate(transferSchema),
  transferController
);



// =====================
// GET ALL TRANSACTIONS
// =====================

router.get(
  "/",
  authenticate,
  getTransactionsController
);



module.exports = router;