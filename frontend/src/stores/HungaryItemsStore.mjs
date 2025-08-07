
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { http } from "@utils/http.mjs";
import { useAuthStore } from "@stores/AuthStore";

export const useHungaryStore = defineStore("items", () => {
  const items = ref([]);
  const item = ref(null);
  const searchQuery = ref("");
  const selectedCategory = ref("");
  const error = ref(null);
  const loading = ref(false);

  // Paginálási változói
  const currentPage = ref(1);
  const itemsPerPage = ref(11);

  const filteredItems = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    const category = selectedCategory.value.trim();

    if (query !== "") {
      return items.value.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
    }

    if (category !== "") {
      return items.value.filter((item) => item.group === category);
    }
    return items.value;
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredItems.value.length / itemsPerPage.value);
  });

const paginatedItems = computed(() => {
  if (!Array.isArray(filteredItems.value) || filteredItems.value.length === 0) {
    return [];
  }
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredItems.value.slice(start, end);
});

  watch([searchQuery, selectedCategory], () => {
    currentPage.value = 1;
  });

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  }

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }
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

  function setCategory(category) {
    selectedCategory.value = category.trim();
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

  async function updateItem(identifier, itemData) {
    error.value = null;
    loading.value = true;
    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders.Authorization) {
        throw new Error("Nincs jogosultságod ehhez a művelethez!");
      }
      const resp = await http.put(`/items/${identifier}`, itemData, {
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

    currentPage,
    itemsPerPage,
    totalPages,
    paginatedItems,

    setCategory,
    getItems,
    getItem,
    updateItem,
    deleteItem,
    createItem,
    
    // lapozóhoz 
    nextPage,
    prevPage,
    goToPage,
  };
});
