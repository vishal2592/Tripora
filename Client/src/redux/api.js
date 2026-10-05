import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001/api",
  // baseURL : "/api",
});

api.interceptors.request.use(
  (config) => {
    // ===============================
    // CHECK CURRENT ROUTE
    // ===============================

    const isAdminRoute =
      window.location.pathname.startsWith("/admin");

    // ===============================
    // GET CORRECT TOKEN
    // ===============================

    const token = isAdminRoute
      ? localStorage.getItem("triporaAdminToken")
      : localStorage.getItem("triporaToken");

    // ===============================
    // ADD AUTHORIZATION HEADER
    // ===============================

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

export default api;