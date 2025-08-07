<template>
    <div class="admin-panel">
        <!-- Hitelesítés -->
        <div v-if="!authStore.isAuthenticated || authLoading" class="loading-container">
            <div v-if="authLoading" class="loading-message">Hitelesítés ellenőrzése...</div>
            <div v-else class="auth-error">Nincs jogosultságod ehhez az oldalhoz!</div>
        </div>

        <!-- Főtartalom -->
        <div v-else class="main-content">
            <header class="admin-header">
                <h1 class="admin-title">Admin Vezérlőpult</h1>
                <div class="user-info">
                    <span class="user-details"><b>Bejelentkezve:</b> <i>{{ authStore.user?.username }}</i></span>
                    <button @click="handleLogout" class="logout-btn">Kijelentkezés</button>
                </div>
            </header>

            <div v-if="hungaryStore.loading" class="loading">Betöltés...</div>

            <div v-if="hungaryStore.error" class="alert error">
                {{ hungaryStore.error }}
                <button v-if="showRetryButton" @click="retryAuth" class="retry-btn">Újra bejelentkezés</button>
            </div>

            <div class="admin-content">
                <div class="content-wrapper">
                    <h2 class="content-title">Admin - Item szerkesztő</h2>

                    <!-- Kereső -->
                    <div class="search-section">
                        <input v-model="hungaryStore.searchQuery" type="text" class="search-input text-center"
                            placeholder="Keresés név/kategória szerint..." />
                    </div>

                    <!-- Táblázat -->
                    <div class="table-wrapper">
                        <table class="admin-table">
                            <thead>
                                <tr class="table-header">
                                    <th class="header-cell icon-col">Ikon</th>
                                    <th class="header-cell">Név</th>
                                    <th class="header-cell">Ár (SÉ)</th>
                                    <th class="header-cell">Ár (Yang)</th>
                                    <th class="header-cell">Kategória</th>
                                    <th class="header-cell">Mennyiség</th>
                                    <th class="header-cell action-col">Mentés</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, idx) in safeFilteredItems" :key="item.name + idx" class="table-row">
                                    <td class="table-cell icon-cell">
                                        <div class="icon-container">
                                            <img :src="item.icon" :alt="item.name" class="item-icon"
                                                :class="item.group == 'vért' || item.group == 'fegyver' ? 'weapon-armor-icon' : 'regular-icon'">
                                        </div>
                                    </td>
                                    <td class="table-cell name-col">
                                        <input v-model="item.name" class="input-field name-input" />
                                    </td>
                                    <td class="table-cell price-col">
                                        <input v-model.number="item.price" type="number"
                                            class="input-field price-input" />
                                    </td>
                                    <td class="table-cell yang-col">
                                        <input :value="formatNumber(item.price_yang)"
                                            @input="item.price_yang = parseNumber($event.target.value)" type="text"
                                            class="input-field yang-input" />
                                    </td>
                                    <td class="table-cell category-col">
                                        <input v-model="item.group" class="input-field category-input" :class="{
                                            'category-targypiac': item.group === 'targypiac',
                                            'category-lada': item.group === 'lada',
                                            'category-fejlesztes': item.group === 'fejlesztes',
                                            'category-talizmanok': item.group === 'talizmanok',
                                            'category-virag': item.group === 'virag',
                                            'category-default': !['targypiac', 'lada', 'fejlesztes', 'talizmanok', 'virag'].includes(item.group)
                                        }" />
                                    </td>
                                    <td class="table-cell quantity-col">
                                        <input v-model.number="item.quantity" type="number"
                                            class="input-field quantity-input" />
                                    </td>
                                    <td class="table-cell action-col">
                                        <button @click="saveItem(item)" class="save-btn">
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
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHungaryStore } from '@stores/HungaryItemsStore.mjs'
import { useAuthStore } from '@stores/AuthStore'
import { http } from '@utils/http.mjs';

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
    const identifier = item.id || item.name;
    try {
        const response = await hungaryStore.updateItem(identifier, item);
        alert('Item sikeresen frissítve!');
        await hungaryStore.getItems();
        await downloadLatestBackup();// Mentés után -->> automatikusan backup letöltés lesz!
    } catch (error) {
        alert(`Hiba: ${error.value}`);
    }
}
async function downloadLatestBackup() {
    const token = authStore.token;
    try {
        const backupList = await http.get('/download-backups', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data);
        if (!Array.isArray(backupList) || backupList.length === 0) return;
        const latest = backupList.reduce((a, b) => new Date(a.created) > new Date(b.created) ? a : b);
        const localNames = JSON.parse(localStorage.getItem('downloadedBackups') || '[]');
        if (localNames.includes(latest.filename)) return;
        const res = await fetch(latest.download_url, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = latest.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        localNames.push(latest.filename);
        localStorage.setItem('downloadedBackups', JSON.stringify(localNames));
    } catch (e) {
        console.warn('Backup letöltés sikertelen:', e);
    }
}
function formatNumber(num) {
    if (num == null || num === "") return "";
    return Number(num).toLocaleString("hu-HU");
}

function parseNumber(str) {
    if (typeof str !== "string") return 0;
    return Number(str.replace(/\s/g, "").replace(/\./g, "").replace(/,/g, ""));
}
</script>

<style scoped>
@import url('@assets/styles/AdminControlPanelStyle.css');
</style>
