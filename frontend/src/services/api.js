
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// REFRESH TOKEN STATE
// ==========================================

let isRefreshing = false;

let refreshSubscribers = [];

// ==========================================
// SUBSCRIBE REQUEST
// ==========================================

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// ==========================================
// NOTIFY WAITING REQUESTS
// ==========================================

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => {
    callback(token);
  });

  refreshSubscribers = [];
};

// ==========================================
// REJECT WAITING REQUESTS
// ==========================================

const onRefreshFailed = (error) => {
  refreshSubscribers.forEach((callback) => {
    callback(null, error);
  });

  refreshSubscribers = [];
};

// ==========================================
// PUBLIC ROUTES
// ==========================================

const publicRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

// ==========================================
// CHECK PUBLIC ROUTE
// ==========================================

const isPublicRoute = () => {
  const currentPath = window.location.pathname;

  return publicRoutes.some((route) =>
    currentPath.startsWith(route)
  );
};

// ==========================================
// CLEAR LOCAL SESSION
// ==========================================

const clearLocalSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.dispatchEvent(
    new Event("userUpdated")
  );
};

// ==========================================
// REDIRECT TO LOGIN
// ==========================================

const redirectToLogin = () => {
  const currentPath = window.location.pathname;

  if (
    currentPath !== "/login" &&
    !isPublicRoute()
  ) {
    window.location.replace("/login");
  }
};

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================
// Attach access token automatically.

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

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================
// Automatically refresh expired access token
// and retry the failed request once.

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error?.config;

    const status = error?.response?.status;

    const errorCode =
      error?.response?.data?.code;

    // ========================================
    // BASIC ERROR CHECK
    // ========================================

    if (!originalRequest || status !== 401) {
      return Promise.reject(error);
    }

    // ========================================
    // NEVER REFRESH THESE ROUTES
    // ========================================

    const requestUrl =
      originalRequest?.url || "";

    const isAuthRequest =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/signup") ||
      requestUrl.includes("/auth/google") ||
      requestUrl.includes("/auth/refresh") ||
      requestUrl.includes("/auth/logout");

    if (isAuthRequest) {
      return Promise.reject(error);
    }

    // ========================================
    // ONLY REFRESH INVALID / EXPIRED TOKEN
    // ========================================

    const shouldRefresh =
      errorCode ===
        "TOKEN_INVALID_OR_EXPIRED" ||
      !errorCode;

    if (!shouldRefresh) {
      return Promise.reject(error);
    }

    // ========================================
    // PREVENT INFINITE RETRY LOOP
    // ========================================

    if (originalRequest._retry) {
      clearLocalSession();
      redirectToLogin();

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ========================================
    // IF REFRESH IS ALREADY RUNNING
    // WAIT FOR IT
    // ========================================

    if (isRefreshing) {
      return new Promise(
        (resolve, reject) => {
          subscribeTokenRefresh(
            (newToken, refreshError) => {
              if (refreshError || !newToken) {
                reject(
                  refreshError || error
                );

                return;
              }

              originalRequest.headers =
                originalRequest.headers || {};

              originalRequest.headers.Authorization =
                `Bearer ${newToken}`;

              resolve(
                api(originalRequest)
              );
            }
          );
        }
      );
    }

    // ========================================
    // START TOKEN REFRESH
    // ========================================

    isRefreshing = true;

    try {
      const refreshResponse =
        await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );

      const newAccessToken =
        refreshResponse?.data?.accessToken;

      // ======================================
      // REFRESH RESPONSE VALIDATION
      // ======================================

      if (!newAccessToken) {
        throw new Error(
          "Refresh token response did not contain an access token"
        );
      }

      // ======================================
      // SAVE NEW ACCESS TOKEN
      // ======================================

      localStorage.setItem(
        "token",
        newAccessToken
      );

      // ======================================
      // NOTIFY WAITING REQUESTS
      // ======================================

      onRefreshed(newAccessToken);

      // ======================================
      // RETRY ORIGINAL REQUEST
      // ======================================

      originalRequest.headers =
        originalRequest.headers || {};

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      // ======================================
      // REFRESH FAILED
      // ======================================

      onRefreshFailed(refreshError);

      clearLocalSession();

      if (!isPublicRoute()) {
        redirectToLogin();
      }

      return Promise.reject(
        refreshError
      );
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;

