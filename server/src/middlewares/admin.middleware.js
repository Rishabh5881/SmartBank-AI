const prisma = require("../config/prisma");

// ==========================================
// ADMIN AUTHORIZATION MIDDLEWARE
// ==========================================

async function requireAdmin(req, res, next) {
  try {
    // ==========================================
    // AUTHENTICATION CHECK
    // ==========================================

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // ==========================================
    // FETCH CURRENT USER ROLE
    // ==========================================

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        role: true,
      },
    });

    // ==========================================
    // USER NOT FOUND
    // ==========================================

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ==========================================
    // CHECK ADMIN ROLE
    // ==========================================

    const role = String(user.role || "")
      .trim()
      .toUpperCase();

    if (role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    // ==========================================
    // ATTACH ROLE
    // ==========================================

    req.user.role = role;

    next();
  } catch (error) {
    console.error(
      "ADMIN MIDDLEWARE ERROR:",
      error?.message || error
    );

    next(error);
  }
}

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  requireAdmin,
};