import axios from "axios";

export const http = axios.create({
  baseURL: "https://backend-admin-login.fly.dev/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Admin-Token":
      "WP1DsHwzJ4bzgutS9JCUkYiGpeYDlt0Tb82zrijqhYxSpf5bpARJHA4kdyTTHEA9",
  },
});
