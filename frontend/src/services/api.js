
import axios from "axios";

// =========================================================
// API CONFIGURATION
// =========================================================

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});

// =========================================================
// REQUEST INTERCEPTOR
// Attach JWT access token automatically
// =========================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// =========================================================
// RESPONSE INTERCEPTOR
// Centralized API error handling
// =========================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Something went wrong";

    console.error("API ERROR:", {
      status,
      message,
      data: error.response?.data,
    });

    // =====================================================
    // TOKEN EXPIRED / UNAUTHORIZED
    // =====================================================

    if (status === 401) {
      localStorage.removeItem("token");

      // Redirect only when user is not already
      // on authentication pages.
      const currentPath = window.location.pathname;

      const authPages = [
        "/login",
        "/signup",
        "/forgot-password",
        "/reset-password",
      ];

      if (!authPages.includes(currentPath)) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
