
const prisma = require("../config/prisma");

const {
  verifyAccessToken,
} = require("../utils/jwt.util");

// =====================================
// AUTHENTICATE USER
// =====================================

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // =====================================
    // CHECK AUTHORIZATION HEADER
    // =====================================

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required",
      });
    }

    // =====================================
    // CHECK BEARER FORMAT
    // =====================================

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    // =====================================
    // EXTRACT TOKEN
    // =====================================

    const token = authHeader.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    // =====================================
    // VERIFY ACCESS TOKEN
    // =====================================

    let decoded;

    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      console.error(
        "ACCESS TOKEN ERROR:",
        error.message
      );

      return res.status(401).json({
        success: false,
        code: "TOKEN_INVALID_OR_EXPIRED",
        message: "Invalid or expired token",
      });
    }

    // =====================================
    // GET USER ID FROM TOKEN
    // =====================================

    const userId = decoded?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // =====================================
    // FETCH USER
    // =====================================

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        name: true,
        email: true,

        // IMPORTANT:
        // Required for Admin / Employee / Customer
        // role-based authorization.
        role: true,

        createdAt: true,
        updatedAt: true,
      },
    });

    // =====================================
    // USER NOT FOUND
    // =====================================

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // =====================================
    // ATTACH USER TO REQUEST
    // =====================================

    req.user = user;

    next();
  } catch (error) {
    console.error(
      "AUTH MIDDLEWARE ERROR:",
      error?.message || error
    );

    next(error);
  }
}

// =====================================
// REQUIRE ADMIN
// =====================================

function requireAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const role = String(
      req.user.role || ""
    )
      .trim()
      .toUpperCase();

    if (role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    console.error(
      "ADMIN AUTHORIZATION ERROR:",
      error?.message || error
    );

    next(error);
  }
}

module.exports = {
  authenticate,
  requireAdmin,
};

