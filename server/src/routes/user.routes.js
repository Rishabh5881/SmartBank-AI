const express = require("express");

const router = express.Router();


const {
  authenticate
} = require("../middlewares/auth.middleware");


const {
  getProfileController,
  updateProfileController
} = require("../controllers/user.controller");




// =====================================
// USER PROFILE ROUTES
// =====================================


// GET PROFILE

router.get(
  "/profile",
  authenticate,
  getProfileController
);



// UPDATE PROFILE

router.put(
  "/profile",
  authenticate,
  updateProfileController
);





module.exports = router;