import axios from "axios";

const http = axios.create({
  baseURL: "https://backend-admin-login.fly.dev/api",
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    console.log("🚀 HTTP Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    console.log("✅ HTTP Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(
      "❌ HTTP Error:",
      error.response?.status,
      error.config?.url,
      error.message
    );

    if (error.code === "ERR_NETWORK") {
      console.error("🔴 Network Error - Possible CORS issue or server down");
    }

    return Promise.reject(error);
  }
);

export { http };
