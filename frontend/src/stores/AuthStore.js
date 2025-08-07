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
      const response = await http.post("/admin/login", {
        username,
        password,
      });

      if (response.data.success && response.data.token) {
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

  function logout() {
    token.value = null;
    user.value = null;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    delete http.defaults.headers.common["Authorization"];
  }

  async function checkAuth() {
    if (!token.value) return false;

    try {
      http.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

      const response = await http.get("/admin/check");

      if (response.data.authenticated) {
        user.value = response.data.user;
        sessionStorage.setItem("user", JSON.stringify(user.value));
        return true;
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    }

    logout();
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
