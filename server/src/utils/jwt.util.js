const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRY,
  JWT_REFRESH_EXPIRY,
} = require("../config/env");


// ==============================
// GENERATE ACCESS TOKEN
// ==============================

function generateAccessToken(user) {

  return jwt.sign(

    {
      id: user.id,
      email: user.email,
    },

    JWT_ACCESS_SECRET,

    {
      expiresIn: JWT_ACCESS_EXPIRY || "15m",
    }

  );

}



// ==============================
// GENERATE REFRESH TOKEN
// ==============================

function generateRefreshToken(user) {

  return jwt.sign(

    {
      id: user.id,
    },

    JWT_REFRESH_SECRET,

    {
      expiresIn: JWT_REFRESH_EXPIRY || "7d",
    }

  );

}



// ==============================
// VERIFY ACCESS TOKEN
// ==============================

function verifyAccessToken(token) {

  return jwt.verify(

    token,

    JWT_ACCESS_SECRET

  );

}



// ==============================
// VERIFY REFRESH TOKEN
// ==============================

function verifyRefreshToken(token) {

  return jwt.verify(

    token,

    JWT_REFRESH_SECRET

  );

}



// ==============================
// HASH TOKEN
// ==============================

function hashToken(token) {

  return crypto

    .createHash("sha256")

    .update(token)

    .digest("hex");

}



module.exports = {

  generateAccessToken,

  generateRefreshToken,

  verifyAccessToken,

  verifyRefreshToken,

  hashToken,

};