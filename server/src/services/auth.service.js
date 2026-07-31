const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

const {
  hashToken
} = require("../utils/jwt.util");

const {
  JWT_REFRESH_EXPIRY_DAYS
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
    password
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
        email: normalizedEmail
      }

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

        password: hashedPassword

      },


      select: {

        id: true,

        name: true,

        email: true,

        createdAt: true

      }

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
    password
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

        email: normalizedEmail

      }

    });



  if (!user) {

    throw new Error(
      "Invalid email or password"
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

    createdAt: user.createdAt

  };

}







// ==============================
// REFRESH TOKEN EXPIRY
// ==============================

function getRefreshExpiryDate() {


  const date = new Date();


  const expiryDays =
    Number(JWT_REFRESH_EXPIRY_DAYS || 7);



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
    userAgent
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
        getRefreshExpiryDate()

    }

  });


}







// ==============================
// FIND SESSION
// ==============================

async function findSessionByToken(refreshToken) {


  if (!refreshToken) {

    throw new Error(
      "Refresh token missing"
    );

  }



  return await prisma.session.findUnique({

    where: {

      refreshTokenHash:
        hashToken(refreshToken)

    }

  });


}







// ==============================
// DELETE SESSION
// ==============================

async function deleteSessionByToken(refreshToken) {


  if (!refreshToken) {

    throw new Error(
      "Refresh token missing"
    );

  }



  await prisma.session.deleteMany({

    where: {

      refreshTokenHash:
        hashToken(refreshToken)

    }

  });


}







// ==============================
// REVOKE ALL SESSIONS
// ==============================

async function revokeAllSessionsForUser(userId) {


  if (!userId) {

    throw new Error(
      "User id missing"
    );

  }



  await prisma.session.deleteMany({

    where: {

      userId

    }

  });


}






module.exports = {

  signup,

  login,

  createSession,

  findSessionByToken,

  deleteSessionByToken,

  revokeAllSessionsForUser

};