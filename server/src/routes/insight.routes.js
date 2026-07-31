const express = require("express");

const {
  getInsightsController
} = require("../controllers/insight.controller");

const { authenticate } = require("../middlewares/auth.middleware");


const router = express.Router();


router.use(authenticate);


router.get(
  "/",
  getInsightsController
);


module.exports = router;