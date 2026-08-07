import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // SAVE USER SESSION
  // ==========================================

  const saveUserSession = (userData) => {
    if (!userData) {
      return;
    }

    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    window.dispatchEvent(
      new Event("userUpdated")
    );
  };

  // ==========================================
  // LOAD CURRENT USER
  // ==========================================

  const loadUser = async () => {
    try {
      const token =
        localStorage.getItem("token");

      // ----------------------------------------
      // NO ACCESS TOKEN
      // ----------------------------------------

      if (!token) {
        setUser(null);
        return;
      }

      // ----------------------------------------
      // FETCH REAL USER FROM BACKEND
      // ----------------------------------------

      const res =
        await api.get("/auth/me");

      /*
       * Backend response:
       *
       * {
       *   success: true,
       *   message: "User profile",
       *   user: {
       *     id,
       *     name,
       *     email,
       *     role,
       *     createdAt,
       *     updatedAt
       *   }
       * }
       */

      const userData =
        res?.data?.user;

      if (!userData) {
        throw new Error(
          "User data missing from /auth/me response"
        );
      }

      // ----------------------------------------
      // SAVE REAL USER
      // ----------------------------------------

      saveUserSession(userData);
    } catch (error) {
      console.error(
        "AUTH LOAD USER ERROR:",
        error
      );

      /*
       * IMPORTANT:
       *
       * Do not blindly remove the token here.
       *
       * api.js already handles:
       *
       * 401
       * -> refresh token
       * -> new access token
       * -> retry /auth/me
       *
       * Only if refresh also fails should
       * the api interceptor clear the session.
       */

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL AUTH CHECK
  // ==========================================

  useEffect(() => {
    loadUser();
  }, []);

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = async () => {
    try {
      /*
       * Backend logout:
       *
       * - removes refresh session
       * - clears httpOnly refresh cookie
       */

      await api.post("/auth/logout");
    } catch (error) {
      /*
       * Even if backend logout fails,
       * local session must still be cleared.
       */

      console.error(
        "LOGOUT API ERROR:",
        error
      );
    } finally {
      // ----------------------------------------
      // CLEAR LOCAL AUTH
      // ----------------------------------------

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);

      window.dispatchEvent(
        new Event("userUpdated")
      );
    }
  };

  // ==========================================
  // AUTH CONTEXT
  // ==========================================

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: saveUserSession,
        logout,
        loading,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ==========================================
// USE AUTH HOOK
// ==========================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

