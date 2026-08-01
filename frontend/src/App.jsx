import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

import Accounts from "./pages/accounts/Accounts";
import Transactions from "./pages/transactions/Transactions";
import Transfer from "./pages/Transfers";

import Cards from "./pages/cards/Cards";
import Loans from "./pages/loans/Loans";

import Admin from "./pages/Admin";
import AdminLoans from "./pages/admin/AdminLoans";

import Employee from "./pages/Employee";

import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <div className="min-h-screen bg-[#020617]">

      {/* ==========================================
          GLOBAL NAVBAR
      ========================================== */}

      <Navbar />

      {/* ==========================================
          APPLICATION ROUTES
      ========================================== */}

      <Routes>

        {/* ==========================================
            PUBLIC ROUTES
        ========================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* ==========================================
            FORGOT PASSWORD
        ========================================== */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ==========================================
            RESET PASSWORD
        ========================================== */}

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* ==========================================
            CUSTOMER DASHBOARD
        ========================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            PROFILE
        ========================================== */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            NOTIFICATIONS
        ========================================== */}

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            ACCOUNTS
        ========================================== */}

        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <Accounts />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            TRANSACTIONS
        ========================================== */}

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            TRANSFERS
        ========================================== */}

        <Route
          path="/transfers"
          element={
            <ProtectedRoute>
              <Transfer />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            CARDS
        ========================================== */}

        <Route
          path="/cards"
          element={
            <ProtectedRoute>
              <Cards />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            LOANS
        ========================================== */}

        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            EMPLOYEE DASHBOARD
        ========================================== */}

        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <Employee />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            ADMIN DASHBOARD
        ========================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            ADMIN LOANS
        ========================================== */}

        <Route
          path="/admin/loans"
          element={
            <ProtectedRoute>
              <AdminLoans />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            FALLBACK
        ========================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </div>
  );
};

export default App;