
import axios from "axios";

// =========================================================
// SMARTBANK AI - API CONFIGURATION
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

export default api;
