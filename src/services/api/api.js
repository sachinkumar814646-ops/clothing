import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ✅ Protected routes list
const PROTECTED_ROUTES = ["/cart", "/wishlists", "/account"];

// ✅ Request interceptor (attach token conditionally)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    const isProtected = PROTECTED_ROUTES.some((route) =>
      config.url?.includes(route)
    );

    if (token && isProtected) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (handle unauthorized)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const isProtected = PROTECTED_ROUTES.some((route) =>
      error.config?.url?.includes(route)
    );

    if (error.response?.status === 401 && isProtected) {
      localStorage.removeItem("authToken");

      // redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;