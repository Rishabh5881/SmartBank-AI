const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const prisma = require("../config/prisma");

const {
hashToken,
} = require("../utils/jwt.util");

const {
JWT_REFRESH_EXPIRY_DAYS,
} = require("../config/env");

// ==============================
// SIGNUP
// ==============================

async function signup(data) {
if (!data) {
throw new Error("Signup data missing");
}

const {
name,
email,
password,
} = data;

if (!name || !email || !password) {
throw new Error("All fields are required");
}

if (password.length < 8) {
throw new Error(
"Password must be at least 8 characters"
);
}

const normalizedEmail =
email.trim().toLowerCase();

const existingUser =
await prisma.user.findUnique({
where: {
email: normalizedEmail,
},
});

if (existingUser) {
throw new Error(
"User already exists"
);
}

const hashedPassword =
await bcrypt.hash(password, 10);

const user =
await prisma.user.create({
data: {
name: name.trim(),
email: normalizedEmail,
password: hashedPassword,
},

  select: {
    id: true,
    name: true,
    email: true,
    createdAt: true,
  },
});

return user;
}

// ==============================
// LOGIN
// ==============================

async function login(data) {
if (!data) {
throw new Error("Login data missing");
}

const {
email,
password,
} = data;

if (!email || !password) {
throw new Error(
"Email and password are required"
);
}

const normalizedEmail =
email.trim().toLowerCase();

const user =
await prisma.user.findUnique({
where: {
email: normalizedEmail,
},
});

if (!user) {
throw new Error(
"Invalid email or password"
);
}

// Google-only account
if (!user.password) {
throw new Error(
"This account uses Google Login. Please continue with Google."
);
}

const passwordMatch =
await bcrypt.compare(
password,
user.password
);

if (!passwordMatch) {
throw new Error(
"Invalid email or password"
);
}

return {
id: user.id,
name: user.name,
email: user.email,
createdAt: user.createdAt,
};
}

// ==============================
// GOOGLE USER
// ==============================

async function findOrCreateGoogleUser(data) {
if (!data) {
throw new Error(
"Google user data missing"
);
}

const {
googleId,
name,
email,
} = data;

if (!googleId || !email) {
throw new Error(
"Google ID and email are required"
);
}

const normalizedEmail =
email.trim().toLowerCase();

// Check Google ID first
let user =
await prisma.user.findUnique({
where: {
googleId,
},
});

if (user) {
return {
id: user.id,
name: user.name,
email: user.email,
createdAt: user.createdAt,
};
}

// Check existing email
user =
await prisma.user.findUnique({
where: {
email: normalizedEmail,
},
});

if (user) {
// Link Google account with existing account
user =
await prisma.user.update({
where: {
id: user.id,
},

    data: {
      googleId,
    },
  });

return {
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
};

}

// Create new Google user
user =
await prisma.user.create({
data: {
name:
name?.trim() ||
normalizedEmail.split("@")[0],

    email: normalizedEmail,

    password: null,

    googleId,
  },

  select: {
    id: true,
    name: true,
    email: true,
    createdAt: true,
  },
});

return user;
}

// ==============================
// CREATE PASSWORD RESET TOKEN
// ==============================

async function createPasswordResetToken(email) {
if (!email) {
throw new Error(
"Email is required"
);
}

const normalizedEmail =
email.trim().toLowerCase();

const user =
await prisma.user.findUnique({
where: {
email: normalizedEmail,
},
});

/*

Do not reveal whether the email
exists at controller level.


Returning null allows the controller
to send the same response for both
existing and non-existing emails.
*/
if (!user) {
return null;
}

// Remove old reset tokens
await prisma.passwordResetToken.deleteMany({
where: {
userId: user.id,
},
});

// Generate secure random token
const rawToken =
crypto.randomBytes(32).toString("hex");

// Store only hash in database
const tokenHash =
hashToken(rawToken);

// Token valid for 15 minutes
const expiresAt =
new Date(
Date.now() + 15 * 60 * 1000
);

await prisma.passwordResetToken.create({
data: {
tokenHash,
userId: user.id,
expiresAt,
},
});

return {
user: {
id: user.id,
name: user.name,
email: user.email,
},

token: rawToken,

expiresAt,

};
}

// ==============================
// RESET PASSWORD
// ==============================

async function resetPassword(
token,
newPassword
) {
if (!token) {
throw new Error(
"Password reset token is required"
);
}

if (!newPassword) {
throw new Error(
"New password is required"
);
}

if (newPassword.length < 8) {
throw new Error(
"Password must be at least 8 characters"
);
}

const tokenHash =
hashToken(token);

const resetToken =
await prisma.passwordResetToken.findUnique({
where: {
tokenHash,
},

  include: {
    user: true,
  },
});

if (!resetToken) {
throw new Error(
"Invalid or expired password reset token"
);
}

if (resetToken.usedAt) {
throw new Error(
"Password reset token has already been used"
);
}

if (
new Date() >
resetToken.expiresAt
) {
await prisma.passwordResetToken.delete({
where: {
id: resetToken.id,
},
});

throw new Error(
  "Password reset token has expired"
);

}

const hashedPassword =
await bcrypt.hash(
newPassword,
10
);

await prisma.$transaction([
prisma.user.update({
where: {
id: resetToken.userId,
},

  data: {
    password: hashedPassword,
  },
}),

prisma.passwordResetToken.update({
  where: {
    id: resetToken.id,
  },

  data: {
    usedAt: new Date(),
  },
}),

/*
 * Password reset invalidates all
 * existing refresh sessions.
 */
prisma.session.deleteMany({
  where: {
    userId: resetToken.userId,
  },
}),

]);

return {
success: true,
};
}

// ==============================
// REFRESH TOKEN EXPIRY
// ==============================

function getRefreshExpiryDate() {
const date = new Date();

const expiryDays =
Number(
JWT_REFRESH_EXPIRY_DAYS || 7
);

date.setDate(
date.getDate() + expiryDays
);

return date;
}

// ==============================
// CREATE SESSION
// ==============================

async function createSession(data) {
if (!data) {
throw new Error(
"Session data missing"
);
}

const {
userId,
refreshToken,
ipAddress,
userAgent,
} = data;

if (!userId || !refreshToken) {
throw new Error(
"Session information missing"
);
}

return await prisma.session.create({
data: {
userId,

  refreshTokenHash:
    hashToken(refreshToken),

  ipAddress,

  userAgent,

  expiresAt:
    getRefreshExpiryDate(),
},

});
}

// ==============================
// FIND SESSION
// ==============================

async function findSessionByToken(
refreshToken
) {
if (!refreshToken) {
throw new Error(
"Refresh token missing"
);
}

return await prisma.session.findUnique({
where: {
refreshTokenHash:
hashToken(refreshToken),
},
});
}

// ==============================
// DELETE SESSION
// ==============================

async function deleteSessionByToken(
refreshToken
) {
if (!refreshToken) {
throw new Error(
"Refresh token missing"
);
}

await prisma.session.deleteMany({
where: {
refreshTokenHash:
hashToken(refreshToken),
},
});
}

// ==============================
// REVOKE ALL SESSIONS
// ==============================

async function revokeAllSessionsForUser(
userId
) {
if (!userId) {
throw new Error(
"User id missing"
);
}

await prisma.session.deleteMany({
where: {
userId,
},
});
}

// ==============================
// EXPORTS
// ==============================

module.exports = {
signup,
login,

findOrCreateGoogleUser,

createPasswordResetToken,
resetPassword,

createSession,
findSessionByToken,
deleteSessionByToken,
revokeAllSessionsForUser,
};