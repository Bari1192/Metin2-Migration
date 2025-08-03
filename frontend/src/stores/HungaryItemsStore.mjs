import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { http } from "@utils/http.mjs";
import { useAuthStore } from "@stores/AuthStore";

export const useHungaryStore = defineStore("items", () => {
  const items = ref([]);
  const item = ref(null);
  const searchQuery = ref("");
  const selectedCategory = ref("");
  const error = ref(null);
  const loading = ref(false);

  const filteredItems = computed(() => {
    if (searchQuery.value && searchQuery.value.trim() !== "") {
      return items.value.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    if (selectedCategory.value && selectedCategory.value.trim() !== "") {
      return items.value.filter(
        (item) => item.group === selectedCategory.value
      );
    }
    return items.value;
  });

  // Helper az "AUTHENTICATED" requests kérés(ek) számára!
  function getAuthHeaders() {
    const authStore = useAuthStore();
    return authStore.token
      ? {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        }
      : {};
  }

  function handleAuthError(err) {
    if (err.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      throw new Error("Hitelesítési hiba - kérlek jelentkezz be újra!");
    }
    throw err;
  }

  async function setCategory(category) {
    selectedCategory.value = category;
    searchQuery.value = "";
  }

  async function getItems() {
    error.value = null;
    loading.value = true;
    try {
      const resp = await http.get("/items");
      items.value = resp.data;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
    } finally {
      loading.value = false;
    }
  }

  async function getItem(identifier) {
    error.value = null;
    loading.value = true;
    try {
      const endpoint =
        typeof identifier === "number" || /^\d+$/.test(identifier)
          ? `/items/${identifier}`
          : `/items/by-name/${identifier}`;
      const resp = await http.get(endpoint);
      item.value = resp.data.data || resp.data;
      return item.value;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // PUT kérés - Admin only!!!
  async function updateItem(identifier, itemData) {
    error.value = null;
    loading.value = true;

    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders.Authorization) {
        throw new Error("Nincs jogosultságod ehhez a művelethez!");
      }
      const resp = await http.post(`/items/${identifier}`, itemData, {
        headers: authHeaders,
      });

      if (!resp.ok) {
        return { success: false, error: result.msg || "Hiba történt" };
      } else {
        return { success: true, data: resp.data };
      }

    } catch (err) {
      try {
        handleAuthError(err);
      } catch (authErr) {
        error.value = authErr.message;
        return { success: false, error: authErr.message, needsAuth: true };
      }

      error.value = err.response?.data?.message || err.message;
      return { success: false, error: error.value };
    } finally {
      await getItems();
      loading.value = false;
    }
  }

  // POST kérés - auth szükséges (admin only!)
  async function createItem(data) {
    error.value = null;
    loading.value = true;

    try {
      const authHeaders = getAuthHeaders();

      if (!authHeaders.Authorization) {
        throw new Error("Nincs jogosultságod ehhez a művelethez!");
      }

      const resp = await http.post("/items", data, { headers: authHeaders });
      await getItems();
      return { success: true, data: resp.data };
    } catch (err) {
      try {
        handleAuthError(err);
      } catch (authErr) {
        error.value = authErr.message;
        return { success: false, error: authErr.message, needsAuth: true };
      }

      error.value = err.response?.data?.message || err.message;
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // DELETE kérés - (admin only)
  async function deleteItem(identifier) {
    error.value = null;
    loading.value = true;

    try {
      const authHeaders = getAuthHeaders();

      if (!authHeaders.Authorization) {
        throw new Error("Nincs jogosultságod ehhez a művelethez!");
      }
      await http.delete(`/items/${identifier}`, { headers: authHeaders });
      await getItems();
      return { success: true };
    } catch (err) {
      try {
        handleAuthError(err);
      } catch (authErr) {
        error.value = authErr.message;
        return { success: false, error: authErr.message, needsAuth: true };
      }

      error.value = err.response?.data?.message || err.message;
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  return {
    items,
    item,
    searchQuery,
    selectedCategory,
    filteredItems,
    error,
    loading,

    setCategory,
    getItems,
    getItem,
    updateItem,
    deleteItem,
    createItem,
  };
});
