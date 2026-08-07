const prisma = require("../config/prisma");

// ==============================
// PROFILE FIELDS
// ==============================

const PROFILE_FIELDS = {
  id: true,
  name: true,
  email: true,
  phoneNumber: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

// ==============================
// GET PROFILE
// ==============================

async function getProfile(userId) {
  if (!userId) {
    throw new Error("User ID required");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: PROFILE_FIELDS,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

// ==============================
// UPDATE PROFILE
// ==============================

async function updateProfile(userId, data) {
  if (!userId) {
    throw new Error("User ID required");
  }

  if (!data) {
    throw new Error("Update data missing");
  }

  const {
    name,
    email,
    phoneNumber,
  } = data;

  // --------------------------------
  // NOTHING TO UPDATE
  // --------------------------------

  if (
    name === undefined &&
    email === undefined &&
    phoneNumber === undefined
  ) {
    throw new Error("Nothing to update");
  }

  const updateData = {};

  // --------------------------------
  // NAME
  // --------------------------------

  if (name !== undefined) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error("Invalid name");
    }

    updateData.name = name.trim();
  }

  // --------------------------------
  // EMAIL
  // --------------------------------

  if (email !== undefined) {
    if (
      typeof email !== "string" ||
      email.trim() === ""
    ) {
      throw new Error("Invalid email");
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (
      existingUser &&
      existingUser.id !== userId
    ) {
      throw new Error(
        "Email address already in use"
      );
    }

    updateData.email = normalizedEmail;
  }

  // --------------------------------
  // PHONE NUMBER
  // --------------------------------

  if (phoneNumber !== undefined) {
    const normalizedPhone =
      phoneNumber === null ||
      String(phoneNumber).trim() === ""
        ? null
        : String(phoneNumber).trim();

    // --------------------------------
    // PHONE VALIDATION
    // --------------------------------

    if (normalizedPhone) {
      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(normalizedPhone)) {
        throw new Error(
          "Phone number must be exactly 10 digits"
        );
      }

      // --------------------------------
      // PHONE DUPLICATE CHECK
      // --------------------------------

      const existingUser =
        await prisma.user.findUnique({
          where: {
            phoneNumber: normalizedPhone,
          },
        });

      if (
        existingUser &&
        existingUser.id !== userId
      ) {
        throw new Error(
          "Phone number already in use"
        );
      }
    }

    updateData.phoneNumber =
      normalizedPhone;
  }

  // --------------------------------
  // UPDATE USER
  // --------------------------------

  const updatedUser =
    await prisma.user.update({
      where: {
        id: userId,
      },

      data: updateData,

      select: PROFILE_FIELDS,
    });

  return updatedUser;
}

// ==============================
// GET SECURITY OVERVIEW
// ==============================

async function getSecurityOverview(userId) {
  if (!userId) {
    throw new Error("User ID required");
  }

  // --------------------------------
  // FETCH USER SECURITY DATA
  // --------------------------------

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      password: true,
      googleId: true,
      phoneNumber: true,
      role: true,

      sessions: {
        select: {
          id: true,
          ipAddress: true,
          userAgent: true,
          expiresAt: true,
          createdAt: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // --------------------------------
  // AUTHENTICATION STATUS
  // --------------------------------

  const hasPassword = Boolean(user.password);

  const hasGoogleLogin = Boolean(
    user.googleId
  );

  let authenticationMethod =
    "Password";

  if (
    hasPassword &&
    hasGoogleLogin
  ) {
    authenticationMethod =
      "Password + Google";
  } else if (hasGoogleLogin) {
    authenticationMethod = "Google";
  }

  // --------------------------------
  // ACTIVE SESSIONS
  // --------------------------------

  const now = new Date();

  const activeSessions =
    user.sessions.filter(
      (session) =>
        new Date(session.expiresAt) > now
    );

  // --------------------------------
  // ACCOUNT SECURITY
  // --------------------------------

  const accountSecurity =
    hasPassword || hasGoogleLogin;

  // --------------------------------
  // PHONE STATUS
  // --------------------------------

  const phoneConfigured =
    Boolean(user.phoneNumber);

  // --------------------------------
  // SECURITY SCORE
  // --------------------------------

  let securityScore = 0;

  if (hasPassword) {
    securityScore += 30;
  }

  if (hasGoogleLogin) {
    securityScore += 20;
  }

  if (phoneConfigured) {
    securityScore += 20;
  }

  if (activeSessions.length > 0) {
    securityScore += 15;
  }

  // Keep score meaningful
  // without pretending MFA exists.
  if (accountSecurity) {
    securityScore += 15;
  }

  securityScore = Math.min(
    securityScore,
    100
  );

  // --------------------------------
  // SECURITY LEVEL
  // --------------------------------

  let securityLevel = "Basic";

  if (securityScore >= 80) {
    securityLevel = "Strong";
  } else if (securityScore >= 60) {
    securityLevel = "Good";
  } else if (securityScore >= 40) {
    securityLevel = "Moderate";
  }

  // --------------------------------
  // SECURITY RECOMMENDATIONS
  // --------------------------------

  const recommendations = [];

  if (!hasPassword) {
    recommendations.push(
      "Add a password to strengthen account security."
    );
  }

  if (!hasGoogleLogin) {
    recommendations.push(
      "Consider enabling Google authentication for additional login protection."
    );
  }

  if (!phoneConfigured) {
    recommendations.push(
      "Add a verified phone number when phone verification is enabled."
    );
  }

  if (activeSessions.length === 0) {
    recommendations.push(
      "No active sessions were detected."
    );
  }

  // --------------------------------
  // SECURITY OVERVIEW RESPONSE
  // --------------------------------

  return {
    accountSecurity: {
      status: accountSecurity
        ? "Active"
        : "Needs Attention",

      protected: accountSecurity,

      description: accountSecurity
        ? "Your account is protected."
        : "Your account requires additional security setup.",
    },

    authentication: {
      status: accountSecurity
        ? "Protected"
        : "Needs Attention",

      method: authenticationMethod,

      passwordEnabled: hasPassword,

      googleLoginEnabled: hasGoogleLogin,

      phoneNumberAdded: phoneConfigured,

      description:
        "Secure login protection status.",
    },

    bankingActivity: {
      status: "Monitoring",

      monitored: true,

      description:
        "Banking activity is monitored through SmartBank security controls.",
    },

    sessions: {
      active: activeSessions.length,

      total: user.sessions.length,
    },

    securityScore: {
      score: securityScore,

      level: securityLevel,
    },

    recommendations,
  };
}

// ==============================
// EXPORTS
// ==============================

module.exports = {
  getProfile,
  updateProfile,
  getSecurityOverview,
};