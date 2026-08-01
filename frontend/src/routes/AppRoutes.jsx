
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* =========================
          PUBLIC ROUTES
      ========================== */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      {/* =========================
          AUTHENTICATED ROUTES
      ========================== */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* =========================
          FALLBACK ROUTE
      ========================== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

