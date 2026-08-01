// server/config/env.js

require("dotenv").config();


// ==========================================
// ENVIRONMENT CONFIGURATION
// ==========================================

module.exports = {

  // ==========================================
  // SERVER
  // ==========================================

  PORT:
    process.env.PORT || 5000,


  NODE_ENV:
    process.env.NODE_ENV || "development",


  // ==========================================
  // DATABASE
  // ==========================================

  DATABASE_URL:
    process.env.DATABASE_URL,


  // ==========================================
  // JWT ACCESS TOKEN
  // ==========================================

  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET,


  JWT_ACCESS_EXPIRY:
    process.env.JWT_ACCESS_EXPIRY || "15m",


  // ==========================================
  // JWT REFRESH TOKEN
  // ==========================================

  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET,


  JWT_REFRESH_EXPIRY:
    process.env.JWT_REFRESH_EXPIRY || "7d",


  JWT_REFRESH_EXPIRY_DAYS:
    Number(
      process.env.JWT_REFRESH_EXPIRY_DAYS
    ) || 7,


  // ==========================================
  // COOKIE
  // ==========================================

  COOKIE_SECURE:
    process.env.NODE_ENV === "production",


  // ==========================================
  // GOOGLE LOGIN
  // ==========================================

  GOOGLE_CLIENT_ID:
    process.env.GOOGLE_CLIENT_ID,

};