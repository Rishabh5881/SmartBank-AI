const prisma = require("../config/prisma");

// ==========================================
// GET USER NOTIFICATIONS
// ==========================================

async function getUserNotifications(userId) {
  return prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ==========================================
// GET UNREAD NOTIFICATIONS
// ==========================================

async function getUnreadNotifications(userId) {
  return prisma.notification.findMany({
    where: {
      userId,
      read: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ==========================================
// MARK NOTIFICATION AS READ
// ==========================================

async function markNotificationAsRead(
  notificationId,
  userId
) {
  return prisma.notification.updateMany({
    where: {
      id: notificationId,
      userId,
      read: false,
    },
    data: {
      read: true,
    },
  });
}

// ==========================================
// MARK ALL NOTIFICATIONS AS READ
// ==========================================

async function markAllNotificationsAsRead(userId) {
  return prisma.notification.updateMany({
    where: {
      userId,
      read: false,
    },
    data: {
      read: true,
    },
  });
}

// ==========================================
// DELETE NOTIFICATION
// ==========================================

async function deleteNotification(
  notificationId,
  userId
) {
  return prisma.notification.deleteMany({
    where: {
      id: notificationId,
      userId,
    },
  });
}

module.exports = {
  getUserNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
};