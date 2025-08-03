import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { http } from "@utils/http.mjs";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(sessionStorage.getItem("token") || null);
  const user = ref(
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null
  );
  const loading = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(
    () => !!token.value && user.value?.role === "admin"
  );
  const isAdmin = computed(() => user.value?.role === "admin");

  async function login(username, password) {
    loading.value = true;
    error.value = null;

    try {
      console.log("🚀 Attempting login...");

      const response = await http.post("/admin/login", {
        username,
        password,
      });

      console.log("✅ Login response:", response.data);

      if (response.data.success) {
        token.value = response.data.token;
        user.value = response.data.user;

        sessionStorage.setItem("token", token.value);
        sessionStorage.setItem("user", JSON.stringify(user.value));

        http.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

        return { success: true };
      } else {
        throw new Error(response.data.message || "Bejelentkezés sikertelen");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Bejelentkezési hiba";
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      if (token.value) {
        await http.post("/admin/logout");
      }
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      token.value = null;
      user.value = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      delete http.defaults.headers.common["Authorization"];
    }
  }

  async function checkAuth() {
    if (!token.value) return false;

    try {
      if (!http.defaults.headers.common["Authorization"]) {
        http.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
      }

      const response = await http.get("/admin/check");

      if (response.data.authenticated) {
        user.value = response.data.user;
        sessionStorage.setItem("user", JSON.stringify(user.value));
        return true;
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    }

    await logout();
    return false;
  }

  function initAuth() {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
      http.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    checkAuth,
    initAuth,
  };
});
