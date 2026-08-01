
import { Navigate, useLocation } from "react-router-dom";

// ==========================================
// CLEAR AUTH SESSION
// ==========================================

const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.dispatchEvent(
    new Event("userUpdated")
  );
};

// ==========================================
// GET CURRENT AUTH SESSION
// ==========================================

const getAuthSession = () => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  // ------------------------------------------
  // TOKEN / USER MISSING
  // ------------------------------------------

  if (!token || !storedUser) {
    return null;
  }

  // ------------------------------------------
  // TOKEN VALIDATION
  // ------------------------------------------

  if (
    typeof token !== "string" ||
    token.trim().length === 0
  ) {
    return null;
  }

  // ------------------------------------------
  // USER JSON PARSING
  // ------------------------------------------

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    console.error(
      "Invalid stored user JSON:",
      error
    );

    return null;
  }

  // ------------------------------------------
  // USER OBJECT VALIDATION
  // ------------------------------------------

  if (
    !user ||
    typeof user !== "object" ||
    Array.isArray(user)
  ) {
    return null;
  }

  // ------------------------------------------
  // REQUIRED USER DATA
  // ------------------------------------------

  if (!user.id || !user.email) {
    return null;
  }

  // ------------------------------------------
  // VALID SESSION
  // ------------------------------------------

  return {
    token,
    user,
  };
};

// ==========================================
// PROTECTED ROUTE
// ==========================================

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const currentPath =
    location.pathname +
    location.search +
    location.hash;

  const session = getAuthSession();

  // ==========================================
  // NO VALID LOCAL SESSION
  // ==========================================

  if (!session) {
    clearAuthSession();

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: currentPath,
        }}
      />
    );
  }

  // ==========================================
  // AUTHENTICATED
  // ==========================================

  return children;
};

export default ProtectedRoute;
