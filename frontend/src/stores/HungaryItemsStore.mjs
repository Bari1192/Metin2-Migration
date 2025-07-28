import { defineStore } from "pinia";
import { ref } from "vue";
import { http } from "@utils/http.mjs";

export const useHungaryStore = defineStore("hungaryitems", () => {
  const items = ref([]);
  const item = ref(null);

  const error = ref(false);

  async function getItems() {
    error.value = null;
    try {
      const resp = await http.get("/items");
      items.value = resp.data;
    } catch (error) {
      error.value = error.message;
    }
  }
  async function getItem(id) {
    error.value = null;
    try {
      const resp = await http.get(`/items/${id}`);
      item.value = resp.data.data;
    } catch (error) {
      error.value = error.message;
      throw error;
    }
  }
  async function updateItem(id, itemData) {
    error.value = null;
    try {
      const resp = await http.put(`/items/${id}`, itemData);
    } catch (error) {
      error.value = error.message;
    }
  }
  async function createItem(data) {
    error.value = null;
    try {
      await http.post("/items", data);
      return true;
    } catch (err) {
      error.value = err.message;
      return false;
    }
  }
  async function deleteItem(id) {
    error.value = null;
    try {
      await http.delete(`/items/${id}`);
    } catch (error) {
      error.value = error.message;
    }
  }

  return {
    items,
    item,

    getItems,
    getItem,
    updateItem,
    deleteItem,
    createItem,
  };
});
