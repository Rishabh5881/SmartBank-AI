const express = require("express");

const router = express.Router();

const {
  authenticate,
} = require("../middlewares/auth.middleware");

const {
  getNotificationsController,
  getUnreadNotificationsController,
  markNotificationAsReadController,
  markAllNotificationsAsReadController,
  deleteNotificationController,
} = require("../controllers/notification.controller");

// ==========================================
// GET ALL USER NOTIFICATIONS
// ==========================================

router.get(
  "/",
  authenticate,
  getNotificationsController
);

// ==========================================
// GET UNREAD USER NOTIFICATIONS
// ==========================================

router.get(
  "/unread",
  authenticate,
  getUnreadNotificationsController
);

// ==========================================
// MARK ALL NOTIFICATIONS AS READ
// ==========================================

router.patch(
  "/read-all",
  authenticate,
  markAllNotificationsAsReadController
);

// ==========================================
// MARK SINGLE NOTIFICATION AS READ
// ==========================================

router.patch(
  "/:id/read",
  authenticate,
  markNotificationAsReadController
);

// ==========================================
// DELETE NOTIFICATION
// ==========================================

router.delete(
  "/:id",
  authenticate,
  deleteNotificationController
);

module.exports = router;