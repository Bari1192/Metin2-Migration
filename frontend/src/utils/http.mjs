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
export { http };
