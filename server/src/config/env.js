// server/config/env.js

require("dotenv").config();


module.exports = {

  PORT: process.env.PORT || 5000,


  NODE_ENV:
    process.env.NODE_ENV || "development",


  DATABASE_URL:
    process.env.DATABASE_URL,


  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET,


  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET,


  JWT_ACCESS_EXPIRY:
    process.env.JWT_ACCESS_EXPIRY || "15m",


  JWT_REFRESH_EXPIRY:
    process.env.JWT_REFRESH_EXPIRY || "7d",


  JWT_REFRESH_EXPIRY_DAYS:
    Number(process.env.JWT_REFRESH_EXPIRY_DAYS) || 7,


  COOKIE_SECURE:
    process.env.NODE_ENV === "production",

};