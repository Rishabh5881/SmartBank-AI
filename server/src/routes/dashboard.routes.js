const express = require("express");


const {
    dashboardSummaryController
} = require("../controllers/dashboard.controller");


const {
    authenticate
} = require("../middlewares/auth.middleware");



const router = express.Router();



router.get(
    "/summary",
    authenticate,
    dashboardSummaryController
);



module.exports = router;