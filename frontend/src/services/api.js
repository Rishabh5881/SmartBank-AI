import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// ATTACH JWT TOKEN
// ==============================

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

// ==============================
// HANDLE API ERRORS
// ==============================

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(
      "API ERROR:",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default api;