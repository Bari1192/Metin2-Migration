import axios from "axios";

export const localdev = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Admin-Token": import.meta.env.VITE_ADMIN_API_TOKEN,
  },
});
