const notificationService = require("../services/notification.service");

// ==========================================
// GET USER NOTIFICATIONS
// ==========================================

async function getNotificationsController(req, res, next) {
  try {
    const notifications =
      await notificationService.getUserNotifications(
        req.user.id
      );

    res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// GET UNREAD NOTIFICATIONS
// ==========================================

async function getUnreadNotificationsController(
  req,
  res,
  next
) {
  try {
    const notifications =
      await notificationService.getUnreadNotifications(
        req.user.id
      );

    res.status(200).json({
      success: true,
      message: "Unread notifications fetched successfully",
      data: notifications,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// MARK NOTIFICATION AS READ
// ==========================================

async function markNotificationAsReadController(
  req,
  res,
  next
) {
  try {
    const { id } = req.params;

    const result =
      await notificationService.markNotificationAsRead(
        id,
        req.user.id
      );

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Notification not found or already read",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// MARK ALL NOTIFICATIONS AS READ
// ==========================================

async function markAllNotificationsAsReadController(
  req,
  res,
  next
) {
  try {
    const result =
      await notificationService.markAllNotificationsAsRead(
        req.user.id
      );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      data: {
        updatedCount: result.count,
      },
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// DELETE NOTIFICATION
// ==========================================

async function deleteNotificationController(
  req,
  res,
  next
) {
  try {
    const { id } = req.params;

    const result =
      await notificationService.deleteNotification(
        id,
        req.user.id
      );

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getNotificationsController,
  getUnreadNotificationsController,
  markNotificationAsReadController,
  markAllNotificationsAsReadController,
  deleteNotificationController,
};