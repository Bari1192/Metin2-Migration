<template>
    <BaseHeader />

    <div class="min-h-screen bg-gray-950 pb-16 flex flex-col items-center">
        <div class="w-full max-w-5xl mx-auto py-8">
            <h2 class="text-2xl mb-5 text-center font-bold text-primary-500">Admin - Item szerkesztő</h2>
            <div class="flex gap-2 mb-8 justify-center">
                <input v-model="searchQuery" type="text"
                    class="rounded-md border px-4 py-2 outline-none bg-white text-gray-800"
                    placeholder="Keresés név/kategória szerint..." />
            </div>

            <table class="w-full bg-gray-900 text-white rounded-lg shadow-lg text-sm overflow-x-auto">
                <thead>
                    <tr class="bg-slate-800 text-center lg:text-lg font-light mx-auto border-b-2 border-white/45 h-2">
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
                    <tr v-for="(item, idx) in filteredItems" :key="item.name + idx"
                        class="hover:bg-slate-700 transition-all duration-150">
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
                                    'text-indigo-100': !['tárgypiac', 'láda', 'fejlesztés','talizmánok','virág'].includes(item.group)
                                }" />
                        </td>
                        <td class="p-2 w-fit">
                            <input v-model.number="item.quantity" type="number"
                                class="bg-gray-800 text-white rounded w-full px-2 py-2 lg:font-semibold lg:tracking-wider" />
                        </td>
                        <td class="p-2">
                            <button @click="saveItem(idx)"
                                class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition lg:font-semibold lg:tracking-wider">
                                Mentés
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="feedback" class="text-center mt-6 lg:text-xl py-3 px-4 w-fit mx-auto rounded-2xl bg-slate-600 text-yellow-500 font-semibold">{{ feedback }}</div>
        </div>
    </div>

    <BaseFooter />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import BaseHeader from "@components/layout/BaseHeader.vue";
import BaseFooter from "@components/layout/BaseFooter.vue";
import { http } from "@utils/http.mjs";
import { localdev } from "@utils/localdev.mjs"
import { useHungaryStore } from "@stores/HungaryItemsStore.mjs";

const hungaryStore = useHungaryStore();
const items = ref([]);
const searchQuery = ref("");
const feedback = ref("");

onMounted(async () => {
    await hungaryStore.getItems();
    items.value = hungaryStore.items;
})

const filteredItems = computed(() => {
    if (!searchQuery.value) return items.value;
    const q = searchQuery.value.toLowerCase();
    return items.value.filter(item =>
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.group && item.group.toLowerCase().includes(q))
    );
});

const saveItem = async (idx) => {
    feedback.value = "";
    try {
        const edited = items.value[idx];
        await http.put(`/items/${idx}`, edited);
        feedback.value = "Sikeres mentés!";
    } catch {
        feedback.value = "Mentés sikertelen!";
    }
};

</script>
<style scoped>
tbody>tr:hover {
    transform: scaleX(101%);
}

tbody tr:first-child {
    border-top: 25px solid transparent;
}
</style>