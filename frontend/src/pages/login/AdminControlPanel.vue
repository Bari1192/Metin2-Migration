<template>
    <div class="admin-panel">
        <!-- Hitelesítés -->
        <div v-if="!authStore.isAuthenticated || authLoading" class="loading-container">
            <div v-if="authLoading">Hitelesítés ellenőrzése...</div>
            <div v-else>Nincs jogosultságod ehhez az oldalhoz!</div>
        </div>

        <!-- Főtartalom -->
        <div v-else class="main-content">
            <header class="admin-header">
                <h1 class="text-xl">Admin Vezérlőpult</h1>
                <div class="user-info">
                    <span><b>Bejelentkezve:</b> <i>{{ authStore.user?.username }}</i></span>
                    <button @click="handleLogout" class="logout-btn">Kijelentkezés</button>
                </div>
            </header>

            <div v-if="hungaryStore.loading" class="loading">Betöltés...</div>
            <div v-if="hungaryStore.error" class="alert error">
                {{ hungaryStore.error }}
                <button v-if="showRetryButton" @click="retryAuth">Újra bejelentkezés</button>
            </div>

            <div class="admin-content min-h-screen bg-gray-950 pb-16 flex flex-col items-center">
                <div class="w-full max-w-5xl xl:max-w-6xl mx-auto py-8">
                    <h2 class="text-2xl mb-5 text-center font-bold text-primary-500">Admin - Item szerkesztő</h2>

                    <!-- Kereső -->
                    <div class="flex gap-2 mb-8 justify-center">
                        <input v-model="hungaryStore.searchQuery" type="text"
                            class="rounded-md border px-4 py-2 bg-white text-gray-800"
                            placeholder="Keresés név/kategória szerint..." />
                    </div>

                    <!-- <div class="create-section mb-6">
                        <h3 class="font-bold mb-2">Új item létrehozása</h3>
                        <form @submit.prevent="handleCreateItem" class="flex flex-col gap-2">
                            <input v-model="newItem.name" placeholder="Item név" required />
                            <input v-model="newItem.group" placeholder="Kategória" required />
                            <input v-model.number="newItem.price" type="number" placeholder="Ár (SÉ)" required />
                            <input v-model.number="newItem.price_yang" type="number" placeholder="Ár (Yang)" />
                            <input v-model.number="newItem.quantity" type="number" placeholder="Mennyiség" />
                            <button type="submit" :disabled="hungaryStore.loading">
                                {{ hungaryStore.loading ? 'Létrehozás...' : 'Létrehozás' }}
                            </button>
                        </form>
                    </div> -->

                    <!-- Táblázat -->
                    <table class="w-full bg-gray-900 text-white rounded-lg shadow-lg text-sm overflow-x-auto">
                        <thead>
                            <tr
                                class="bg-slate-800 text-center lg:text-lg font-light mx-auto border-b-2 border-white/45 h-2">
                                <th class="rounded-tl-lg px-2 py-4"></th>
                                <th class="p-2">Név</th>
                                <th class="p-2">Ár (SÉ)</th>
                                <th class="p-2">Ár (Yang)</th>
                                <th class="p-2">Kategória</th>
                                <th class="p-2">Mennyiség</th>
                                <th class="p-2 rounded-tr-lg">Mentés</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, idx) in safeFilteredItems" :key="item.name + idx"
                                class="hover:bg-slate-700">
                                <td class="p-2 text-center">
                                    <img :src="item.icon" alt="ikon" class="object-contain mx-auto"
                                        :class="item.group == 'vért' || item.group == 'fegyver' ? 'h-6 w-4 md:h-8 md:w-5 lg:h-10 lg:w-6' : 'max-h-6 max-w-6 lg:max-w-12 lg:max-h-12'">
                                </td>
                                <td class="p-2 w-1/3">
                                    <input v-model="item.name"
                                        class="bg-gray-800 text-white rounded w-full px-3 py-2  lg:font-semibold lg:tracking-wider" />
                                </td>
                                <td class="p-2 w-fit">
                                    <input v-model.number="item.price" type="number"
                                        class="bg-gray-800 text-yellow-200 rounded w-full px-2 py-2 lg:font-semibold lg:tracking-wider text-center" />
                                </td>
                                <td class="p-2 w-fit ">
                                    <input v-model.number="item.price_yang" type="number"
                                        class="bg-gray-800 text-green-200 rounded w-full px-2 py-2 lg:font-semibold lg:tracking-wider text-center" />
                                </td>
                                <td class="p-2 w-fit">
                                    <input v-model="item.group"
                                        class="bg-gray-800 rounded w-full text-center mx-auto px-2 py-2 lg:font-semibold lg:tracking-wider"
                                        :class="{
                                            'text-yellow-100': item.group === 'tárgypiac',
                                            'text-sky-400': item.group === 'láda',
                                            'text-purple-400': item.group === 'fejlesztés',
                                            'text-green-500': item.group === 'talizmánok',
                                            'text-rose-300': item.group === 'virág',
                                            'text-indigo-100': !['tárgypiac', 'láda', 'fejlesztés', 'talizmánok', 'virág'].includes(item.group)
                                        }" />
                                </td>
                                <td class="p-2 w-fit">
                                    <input v-model.number="item.quantity" type="number"
                                        class="bg-gray-800 text-white rounded w-full px-2 py-2 lg:font-semibold lg:tracking-wider" />
                                </td>
                                <td class="p-2">
                                    <button @click="saveItem(item)"
                                        class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition lg:font-semibold lg:tracking-wider">
                                        Mentés
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHungaryStore } from '@stores/HungaryItemsStore.mjs'
import { useAuthStore } from '@stores/AuthStore'

const router = useRouter()
const authStore = useAuthStore()
const hungaryStore = useHungaryStore()

const authLoading = ref(true)
const result = ref('');

const newItem = ref({
    name: '',
    group: '',
    price: 0,
    price_yang: 0,
    quantity: 1,
})

const showRetryButton = computed(() => {
    return hungaryStore.error?.includes('Hitelesítési hiba')
})

const safeFilteredItems = computed(() => {
    return Array.isArray(hungaryStore.filteredItems)
        ? hungaryStore.filteredItems.filter(item => item && typeof item === 'object')
        : []
})

onMounted(async () => {
    const isAuthenticated = await authStore.checkAuth()
    if (!isAuthenticated) {
        router.push('/adminpanel')
        return
    }
    authLoading.value = false
    await hungaryStore.getItems()
})

async function handleLogout() {
    await authStore.logout()
    router.push('/adminpanel')
}

function retryAuth() {
    router.push('/adminpanel')
}

async function saveItem(item) {
    const identifier = item.id || item.name
    try {
        const response = await hungaryStore.updateItem(identifier, item)
        alert('Item sikeresen frissítve!')
        console.log(response.data);
        await hungaryStore.getItems();
    }
    catch (error) {
        alert(`Hiba: ${error.value}`)
    }
}
</script>


<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    font-size: 1.2rem;
}

.loading {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
    color: #666;
}

.no-items {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-style: italic;
}

.item-error {
    background: #ffe6e6;
    border: 1px solid #ffcccc;
    color: #cc0000;
    padding: 1rem;
    border-radius: 4px;
    text-align: center;
}

/* További stílusok változatlanok... */
.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #232936;
    color: white;
    margin-bottom: 2rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logout-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

.logout-btn:hover {
    background: #c82333;
}

.admin-content {
    padding: 0 2rem;
}

.alert {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
}

.alert.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.retry-btn {
    margin-left: 1rem;
    background: #007bff;
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    cursor: pointer;
}

.create-section {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
}

.create-form {
    display: flex;
    gap: 1rem;
    align-items: end;
}

.create-form input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
}

.item-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background: white;
}

.item-actions,
.edit-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

.edit-btn,
.save-btn {
    background: #007bff;
    color: white;
}

.delete-btn,
.cancel-btn {
    background: #dc3545;
    color: white;
}

button {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    opacity: 0.9;
}

button:disabled {
    background: #6c757d;
    cursor: not-allowed;
}
</style>