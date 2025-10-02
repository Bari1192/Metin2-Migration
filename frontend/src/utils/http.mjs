import axios from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export { http };
