const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

// =====================
// ROUTES
// =====================

const authRoutes = require("./routes/auth.routes");
const accountRoutes = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");
const userRoutes = require("./routes/user.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const insightRoutes = require("./routes/insight.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const cardRoutes = require("./routes/card.routes");
const goalRoutes = require("./routes/goal.routes");
const loanRoutes = require("./routes/loan.routes");

// =====================
// ERROR MIDDLEWARE
// =====================

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// =====================
// SECURITY MIDDLEWARE
// =====================

app.use(helmet());

// =====================
// CORS CONFIG
// =====================

const allowedOrigins = [
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header
      // such as Postman/server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,
  })
);

// =====================
// RATE LIMITER
// =====================

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  // Development-friendly limit.
  // This prevents the dashboard's multiple API
  // requests from immediately hitting the limiter.
  max: 500,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use("/api", apiLimiter);

// =====================
// LOGGER
// =====================

app.use(morgan("dev"));

// =====================
// BODY PARSER
// =====================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =====================
// COOKIE PARSER
// =====================

app.use(cookieParser());

// =====================
// HEALTH CHECK
// =====================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SmartBank AI API is healthy",
  });
});

// =====================
// API ROUTES
// =====================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/accounts",
  accountRoutes
);

app.use(
  "/api/transactions",
  transactionRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/insights",
  insightRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

// =====================
// CARD ROUTES
// =====================

app.use(
  "/api/cards",
  cardRoutes
);

// =====================
// GOAL ROUTES
// =====================

app.use(
  "/api/goals",
  goalRoutes
);

// =====================
// LOAN ROUTES
// =====================

app.use(
  "/api/loans",
  loanRoutes
);

// =====================
// 404 HANDLER
// =====================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =====================
// ERROR HANDLER
// =====================

app.use(errorMiddleware);

// =====================
// EXPORT
// =====================

module.exports = app;

