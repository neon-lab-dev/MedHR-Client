// utils/axiosInstance.ts
import axios from "axios";
import Cookies from "js-cookie";

// Create an axios instance
const axiosInstance = axios.create({
//   baseURL: "http://localhost:7000/api/v1",
  baseURL: "https://medhrplus-server.vercel.app/api/v1",
  withCredentials: true,
});

// Add a request interceptor to attach Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const employeeToken = Cookies.get("employee_auth_token");
    const employerToken = Cookies.get("employeer_auth_token");

    const token = employeeToken || employerToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
