const userService = require("../services/user.service");

// =====================================
// GET PROFILE
// =====================================

async function getProfileController(req, res, next) {
  try {
    // ---------------------------------
    // AUTHENTICATION CHECK
    // ---------------------------------

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await userService.getProfile(
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error(
      "GET PROFILE ERROR:",
      error
    );

    next(error);
  }
}

// =====================================
// UPDATE PROFILE
// =====================================

async function updateProfileController(req, res, next) {
  try {
    // ---------------------------------
    // AUTHENTICATION CHECK
    // ---------------------------------

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // ---------------------------------
    // REQUEST BODY CHECK
    // ---------------------------------

    if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
      });
    }

    // ---------------------------------
    // ALLOW ONLY PROFILE FIELDS
    // ---------------------------------

    const allowedFields = [
      "name",
      "email",
      "phoneNumber",
    ];

    const receivedFields = Object.keys(
      req.body
    );

    const invalidFields =
      receivedFields.filter(
        (field) =>
          !allowedFields.includes(field)
      );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Unsupported profile field: ${invalidFields[0]}`,
      });
    }

    // ---------------------------------
    // NOTHING TO UPDATE
    // ---------------------------------

    if (receivedFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nothing to update",
      });
    }

    // ---------------------------------
    // UPDATE PROFILE
    // ---------------------------------

    const user =
      await userService.updateProfile(
        req.user.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    const message =
      error?.message || "";

    // ---------------------------------
    // VALIDATION ERRORS
    // ---------------------------------

    if (
      message === "User ID required" ||
      message === "Update data missing" ||
      message === "Nothing to update" ||
      message === "Invalid name" ||
      message === "Invalid email" ||
      message ===
        "Phone number must be exactly 10 digits"
    ) {
      return res.status(400).json({
        success: false,
        message,
      });
    }

    // ---------------------------------
    // CONFLICT ERRORS
    // ---------------------------------

    if (
      message ===
        "Email address already in use" ||
      message ===
        "Phone number already in use"
    ) {
      return res.status(409).json({
        success: false,
        message,
      });
    }

    // ---------------------------------
    // USER NOT FOUND
    // ---------------------------------

    if (message === "User not found") {
      return res.status(404).json({
        success: false,
        message,
      });
    }

    // ---------------------------------
    // UNKNOWN ERROR
    // ---------------------------------

    next(error);
  }
}

// =====================================
// GET SECURITY OVERVIEW
// =====================================

async function getSecurityOverviewController(
  req,
  res,
  next
) {
  try {
    // ---------------------------------
    // AUTHENTICATION CHECK
    // ---------------------------------

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // ---------------------------------
    // GET REAL SECURITY DATA
    // ---------------------------------

    const security =
      await userService.getSecurityOverview(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message:
        "Security overview fetched successfully",
      data: security,
    });
  } catch (error) {
    console.error(
      "GET SECURITY OVERVIEW ERROR:",
      error
    );

    const message =
      error?.message || "";

    // ---------------------------------
    // USER NOT FOUND
    // ---------------------------------

    if (message === "User not found") {
      return res.status(404).json({
        success: false,
        message,
      });
    }

    // ---------------------------------
    // AUTHENTICATION
    // ---------------------------------

    if (message === "User ID required") {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // ---------------------------------
    // UNKNOWN ERROR
    // ---------------------------------

    next(error);
  }
}

// =====================================
// EXPORTS
// =====================================

module.exports = {
  getProfileController,
  updateProfileController,
  getSecurityOverviewController,
};