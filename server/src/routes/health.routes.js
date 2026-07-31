const express = require("express");
const prisma = require("../config/prisma");

const router = express.Router();

// GET /api/health
// Returns server status and PostgreSQL database connectivity status
router.get("/", async (req, res) => {
  const healthReport = {
    status: "ok",
    service: "SmartBank AI - Server",
    timestamp: new Date().toISOString(),
    uptime_seconds: process.uptime(),
    database: {
      provider: "PostgreSQL",
      status: "unknown",
    },
  };

  try {
    // Simple raw query to verify the database connection is alive
    await prisma.$queryRaw`SELECT 1`;
    healthReport.database.status = "connected";
    return res.status(200).json(healthReport);
  } catch (error) {
    healthReport.status = "degraded";
    healthReport.database.status = "disconnected";
    healthReport.database.error = error.message;
    return res.status(200).json(healthReport);
  }
});

module.exports = router;