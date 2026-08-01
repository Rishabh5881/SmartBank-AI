const authService = require("../services/auth.service");
const prisma = require("../config/prisma");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.util");

const {
  COOKIE_SECURE,
  JWT_REFRESH_EXPIRY_DAYS,
  GOOGLE_CLIENT_ID,
} = require("../config/env");

const ApiError = require("../utils/ApiError");

// ==============================
// COOKIE CONFIG
// ==============================

const REFRESH_COOKIE_NAME = "refreshToken";

const COOKIE_MAX_AGE =
  Number(JWT_REFRESH_EXPIRY_DAYS || 7) *
  24 *
  60 *
  60 *
  1000;

// ==============================
// SET COOKIE
// ==============================

function setRefreshCookie(res, token) {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: COOKIE_SECURE,
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
    path: "/api/auth",
  });
}

// ==============================
// CLEAR COOKIE
// ==============================

function clearRefreshCookie(res) {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    secure: COOKIE_SECURE,
    sameSite: "strict",
    path: "/api/auth",
  });
}

// ==============================
// SIGNUP
// ==============================

async function signupController(req, res, next) {
  try {
    const user = await authService.signup(req.body);

    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

// ==============================
// LOGIN
// ==============================

async function loginController(req, res, next) {
  try {
    const user = await authService.login(req.body);

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    await authService.createSession({
      userId: user.id,
      refreshToken,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

// ==============================
// GOOGLE TOKEN VERIFICATION
// ==============================

async function verifyGoogleToken(credential) {
  if (!credential) {
    throw ApiError.unauthorized(
      "Google credential is required"
    );
  }

  if (!GOOGLE_CLIENT_ID) {
    throw ApiError.internal(
      "Google Client ID is not configured"
    );
  }

  try {
    const googleResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(
        credential
      )}`
    );

    if (!googleResponse.ok) {
      throw new Error("Invalid Google token");
    }

    const googleData = await googleResponse.json();

    if (googleData.aud !== GOOGLE_CLIENT_ID) {
      throw new Error(
        "Google token audience mismatch"
      );
    }

    if (googleData.email_verified !== "true") {
      throw new Error(
        "Google email is not verified"
      );
    }

    if (!googleData.email) {
      throw new Error(
        "Google email not available"
      );
    }

    return {
      googleId: googleData.sub,
      name:
        googleData.name ||
        googleData.email.split("@")[0],
      email: googleData.email,
    };
  } catch (err) {
    console.error(
      "GOOGLE TOKEN VERIFICATION ERROR:",
      err
    );

    throw ApiError.unauthorized(
      "Google authentication failed"
    );
  }
}

// ==============================
// GOOGLE LOGIN
// ==============================

async function googleLoginController(
  req,
  res,
  next
) {
  try {
    const { credential } = req.body || {};

    const googleUser =
      await verifyGoogleToken(credential);

    const user =
      await authService.findOrCreateGoogleUser(
        googleUser
      );

    const accessToken =
      generateAccessToken(user);

    const refreshToken =
      generateRefreshToken(user);

    await authService.createSession({
      userId: user.id,
      refreshToken,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Google login successful",
      accessToken,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

// ==============================
// FORGOT PASSWORD
// ==============================

async function forgotPasswordController(
  req,
  res,
  next
) {
  try {
    const { email } = req.body || {};

    if (!email) {
      throw ApiError.badRequest(
        "Email is required"
      );
    }

    const result =
      await authService.createPasswordResetToken(
        email
      );

    /*
     * Do not reveal whether the email
     * exists in the database.
     */

    if (result) {
      /*
       * Development mode only.
       *
       * Later this token should be
       * delivered through an email service.
       */

      console.log(
        "================================="
      );

      console.log(
        "SMARTBANK PASSWORD RESET"
      );

      console.log(
        "Email:",
        result.user.email
      );

      console.log(
        "Reset Token:",
        result.token
      );

      console.log(
        "Expires:",
        result.expiresAt
      );

      console.log(
        "================================="
      );
    }

    res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, password reset instructions have been sent.",
    });
  } catch (err) {
    next(err);
  }
}

// ==============================
// RESET PASSWORD
// ==============================

async function resetPasswordController(
  req,
  res,
  next
) {
  try {
    const {
      token,
      password,
      newPassword,
    } = req.body || {};

    const finalPassword =
      newPassword || password;

    if (!token) {
      throw ApiError.badRequest(
        "Password reset token is required"
      );
    }

    if (!finalPassword) {
      throw ApiError.badRequest(
        "New password is required"
      );
    }

    await authService.resetPassword(
      token,
      finalPassword
    );

    res.status(200).json({
      success: true,
      message:
        "Password reset successful. Please login with your new password.",
    });
  } catch (err) {
    next(err);
  }
}

// ==============================
// REFRESH TOKEN
// ==============================

async function refreshController(
  req,
  res,
  next
) {
  try {
    const refreshToken =
      req.cookies.refreshToken;

    if (!refreshToken) {
      throw ApiError.unauthorized(
        "Refresh token required"
      );
    }

    let decoded;

    try {
      decoded =
        verifyRefreshToken(
          refreshToken
        );
    } catch (err) {
      throw ApiError.unauthorized(
        "Invalid refresh token"
      );
    }

    const session =
      await authService.findSessionByToken(
        refreshToken
      );

    if (!session) {
      clearRefreshCookie(res);

      throw ApiError.unauthorized(
        "Session expired, login again"
      );
    }

    if (
      new Date() >
      new Date(session.expiresAt)
    ) {
      await authService.deleteSessionByToken(
        refreshToken
      );

      clearRefreshCookie(res);

      throw ApiError.unauthorized(
        "Session expired, login again"
      );
    }

    await authService.deleteSessionByToken(
      refreshToken
    );

    const user =
      await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },

        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

    if (!user) {
      clearRefreshCookie(res);

      throw ApiError.notFound(
        "User not found"
      );
    }

    const newAccessToken =
      generateAccessToken(user);

    const newRefreshToken =
      generateRefreshToken(user);

    await authService.createSession({
      userId: user.id,
      refreshToken: newRefreshToken,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    setRefreshCookie(
      res,
      newRefreshToken
    );

    res.status(200).json({
      success: true,
      message:
        "Token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (err) {
    next(err);
  }
}

// ==============================
// LOGOUT
// ==============================

async function logoutController(
  req,
  res,
  next
) {
  try {
    const refreshToken =
      req.cookies.refreshToken;

    if (refreshToken) {
      await authService.deleteSessionByToken(
        refreshToken
      );
    }

    clearRefreshCookie(res);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    next(err);
  }
}

// ==============================
// ME
// ==============================

async function getMeController(
  req,
  res,
  next
) {
  try {
    res.status(200).json({
      success: true,
      message: "User profile",
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
}

// ==============================
// EXPORTS
// ==============================

module.exports = {
  signupController,
  loginController,

  googleLoginController,

  forgotPasswordController,
  resetPasswordController,

  refreshController,
  logoutController,
  getMeController,
};