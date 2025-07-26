<script setup>
import BaseHeader from '@components/layout/BaseHeader.vue';
import BaseFooter from '@components/layout/BaseFooter.vue';
import PolskaFlag from '@assets/svgs/PolskaFlag.vue';
import HungaryFlag from '@assets/svgs/HungaryFlag.vue';

import AddItemToCalculator from './AddItemToCalculator.vue';
import { reactive, computed, watch, ref } from "vue";
import { polskaStore } from '@stores/ItemStore_Polska.mjs';
import { hungaryStore } from '@stores/ItemStore_Hungary.mjs';

const searchQuery = ref('');

const itemStore = hungaryStore();
const itemList = reactive([]);
const newItem = reactive({
    name: "",
    price: 0,
    quantity: 1,
});

const filteredItems = computed(() => {
    return itemStore.hungaryItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})
function getQuantity(name) {
    const match = name.match(/$(?:[^\d]*?)(\d+)[^$]*$/);
    return match ? parseInt(match[1]) : 1;
}
const itemOptions = computed(() => itemStore.hungaryItems);
const formattedPrice = computed(() => {
    const selectedItem = itemStore.hungaryItems.find((item) => item.name === newItem.name);
    return selectedItem ? formatPrice(selectedItem.price) : "";
});

const totalAmount = computed(() =>
    itemList.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

watch(
    () => newItem.name,
    (newName) => {
        const selectedItem = itemStore.hungaryItems.find((item) => item.name === newName);
        newItem.price = selectedItem ? selectedItem.price : 0;
    }
);
function addItem() {
    if (!newItem.name) {
        alert("Válassz egy tételt!");
        return;
    }
    itemList.push({ ...newItem });
    newItem.name = "";
    newItem.price = 0;
    newItem.quantity = 1;
}
function formatPrice(price) {
    if (price < 1) {
        return `${(price * 100).toFixed(0)} m`;
    } else {
        return `${price.toFixed(2)} w`;
    }
}
</script>

<template>
    <BaseHeader />

    <div class="container w-full min-h-screen mx-auto text-white text-center">

        <div class="my-4 w-full h-full mx-auto">
            <h1 class="text-4xl font-extrabold tracking-wider mb-2">Metin2 Migration Price Tracker</h1>
            <h2 class="text-2xl font-extrabold tracking-wider">Compare item prices before moving from <br> Polish or
                Hungarian servers</h2>
        </div>

        <div class="mt-8 w-full h-full mx-auto">
            <h3 class="text-2xl font-extrabold tracking-wider text-start mb-4 underline underline-offset-8">Server where
                you are playing </h3>
            <div class="w-1/2 max-h-fit flex flex-row space-x-6 my-8">

                <div class="transition-all hover:scale-125 duration-300 ease-in-out hover:cursor-pointer">
                    <PolskaFlag />
                </div>
                <div class="transition-all hover:scale-125 duration-300 ease-in-out hover:cursor-pointer">
                    <HungaryFlag />
                </div>

            </div>
        </div>


        <div class="mt-8 w-full h-full mx-auto">
            <h3 class="text-2xl font-extrabold tracking-wider text-start mb-4 underline underline-offset-8">Selected
                server where you would go to</h3>
            <div class="w-1/2 flex flex-row space-x-6">
                <div class="transition-all hover:scale-125 duration-300 ease-in-out hover:cursor-pointer">
                    <PolskaFlag />
                </div>
                <div class="transition-all hover:scale-125 duration-300 ease-in-out hover:cursor-pointer">
                    <HungaryFlag />
                </div>
            </div>
        </div>

        <div class="mt-8 w-full h-full mx-auto">
            <h3 class="text-2xl font-extrabold tracking-wider text-start mb-4 underline underline-offset-8">In-game cost
                of moving </h3>
            <div class="w-1/2 flex items-center flex-row space-x-6">
                <img src="@assets/img/DragonCoin.png" alt="Picture of Dragon coins" class="w-24">
                <p class="text-3xl font-extrabold text-yellow-400">=</p>
                <input type="number" name="CostOfMoving" id="costofmoving"
                    class="text-black font-semibold py-1 pr-2 rounded-lg text-end max-w-24 tracking-widest"
                    placeholder="790">
                <select name="currency" id="currency" class="text-black font-semibold py-1 px-3 mx-auto rounded-lg">
                    <option class="mx-auto " value="yang">Yang</option>
                    <option class="mx-auto" value="won">Won</option>
                    <option selected class="mx-auto" value="dc">DC</option>
                </select>
            </div>
        </div>

        <div class="mt-8 w-full h-full">
            <h3 class="text-2xl font-extrabold tracking-wider text-start mb-4 underline underline-offset-8">
                Tétel Felvitele - Becsült árral</h3>

            <div class="container my-8 w-full h-full mx-auto justify-center 
            rounded-t-lg rounded-b-lg border-2 shadow-lg shadow-indigo-950 border-indigo-900/75
            border-b-4 border-r-4 border-r-indigo-900/90 border-b-indigo-900/90
            ">
                <div class="head min-h-[5dvh] w-full h-full border-b-4 border-stone-400 rounded-t-md overflow-hidden ">
                    <div class="text-2xl py-5 font-extrabold tracking-wider bg-stone-950/65"
                        style="font-family: 'Noto Serif';">
                        Tárgyak & Árak keresése
                    </div>
                </div>


                <div
                    class="body h-full md:min-h-[55dvh] lg:min-h-[80dvh] mx-auto grid grid-cols-3 lg:grid-cols-5 overflow-hidden">

                    <div
                        class="firstcolumn-secondlayer px-3 bg-slate-900/80 rounded-b-lg w-full h-full flex flex-col justify-between text-center">
                        <div>
                            <div
                                class="searchtitle flex justify-center w-full h-fit border-t-2 border-b-2 border-t-slate-500/85 border-b-slate-500/85 mt-4 rounded-t-md rounded-b-md shadow-lg shadow-gray-950/50">
                                <p class="w-full h-full py-2 rounded-b-sm rounded-t-sm mx-auto bg-stone-500/35 ">
                                    Szerver kiválasztása
                                </p>
                            </div>

                            <div class="h-fit w-full flex justify-center mx-auto">
                                <div class="flex w-fit justify-center items-center gap-4 mx-auto mt-4 align-middle">
                                    <div class="flex px-1 flex-col justify-center items-center hover:cursor-pointer"
                                        @click="">
                                        <PolskaFlag />
                                        <span class="text-sm text-gray-400/90 font-semibold pt-1">Polska</span>
                                    </div>
                                    <div class="my-auto w-[2px] h-[80%] bg-slate-400/25">

                                    </div>
                                    <div class="flex px-1 flex-col justify-center items-center hover:cursor-pointer"
                                        @click="">
                                        <HungaryFlag />
                                        <span class="text-sm text-gray-400/90 font-semibold pt-1">Magyar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                class="searchtitle flex justify-center w-full h-fit border-t-2 border-b-2 border-t-slate-500/85 border-b-slate-500/85 rounded-t-md rounded-b-md shadow-lg shadow-gray-950/50">
                                <p class="w-full h-full py-2 rounded-b-sm rounded-t-sm mx-auto bg-stone-500/35 ">
                                    Gyors kategória-keresés
                                </p>
                            </div>

                            <div class="h-full w-full flex justify-center mx-auto mt-3">
                                <div
                                    class="flex w-fit justify-center items-center gap-4 mx-auto align-middle border-b-2 border-slate-400/5 pb-2">
                                    <div class="flex px-1 flex-col justify-center items-center hover:cursor-pointer"
                                        @click="searchQuery = 'vért'">
                                        <img src="https://img.m2icondb.com/12010.png" alt="Vértek" class="">
                                        <span class="text-sm text-gray-400/90 font-semibold">Vértek</span>
                                    </div>
                                    <div class="flex flex-col justify-center items-center">
                                        <img src="https://img.m2icondb.com/00360.png" alt="Fegyverek" class="">
                                        <span class="text-sm text-gray-400/90 font-semibold">Fegyverek</span>
                                    </div>
                                    <div class="flex flex-col justify-center items-center">
                                        <img src="https://img.m2icondb.com/41002.png" alt="Jelmezek" class="">
                                        <span class="text-sm text-gray-400/90 font-semibold">Jelmezek</span>
                                    </div>
                                </div>
                            </div>

                            <div class="h-fit w-full flex justify-center mx-auto mt-3">
                                <div
                                    class="flex w-fit justify-center items-center gap-4 mx-auto align-middle border-b-2 border-slate-400/5 pb-2">
                                    <div class="flex flex-col justify-center items-center hover:cursor-pointer"
                                        @click="searchQuery = 'ital'">
                                        <img src="https://img.m2icondb.com/27102.png" alt="Italok" class="">
                                        <span class="text-sm text-gray-400/90 font-semibold">Italok</span>
                                    </div>
                                    <div class="flex flex-col justify-center items-center ">
                                        <img src="https://img.m2icondb.com/14500.png" alt="Nyakláncok" class="">
                                        <span class="text-sm text-gray-400/90 font-semibold">Ékszerek</span>
                                    </div>
                                    <div class="flex flex-col justify-center items-center hover:cursor-pointer">
                                        <img src="https://img.m2icondb.com/50701.png" alt="Virágok" class=""
                                            @click="searchQuery = 'virág'">
                                        <span class="text-sm text-gray-400/90 font-semibold">Virágok</span>
                                    </div>
                                </div>
                            </div>

                            <div class="h-fit w-full flex justify-center mx-auto mt-3">
                                <div
                                    class="flex w-fit justify-center items-center gap-4 mx-auto align-middle border-b-2 border-slate-400/5 pb-2">
                                    <div class="flex flex-col justify-center items-center hover:cursor-pointer"
                                        @click="searchQuery = 'láda'">
                                        <img src="https://img.m2icondb.com/50011.png" alt="Holdfény kincsesláda"
                                            class="">
                                        <span class="text-sm text-gray-400/90 font-semibold">Ládák</span>
                                    </div>
                                    <div class="flex flex-col justify-center items-center hover:cursor-pointer "
                                        @click="searchQuery = 'talizmán'">
                                        <img src="https://img.m2icondb.com/9830.png" alt="Talizmánok" class="">
                                        <span class="text-sm text-gray-400/90 font-semibold">Talizmánok</span>
                                    </div>
                                    <div class="flex flex-col justify-center items-center ">
                                        <img src="https://img.m2icondb.com/80016.png" alt="Tárgypiac" class="">
                                        <span class="text-sm text-gray-400/90 font-semibold">Tárgypiac</span>
                                    </div>
                                </div>
                            </div>

                            <div class="h-fit w-full flex justify-center mx-auto mt-3">
                                <div class="flex w-full justify-center items-center gap-4 mx-auto align-middle">
                                    <div class="flex flex-col justify-center items-center ">
                                        <img src="https://img.m2icondb.com/25040.png" alt="Fejlesztők" class="">
                                        <span class="text-sm text-gray-400/90 font-semibold">Fejlesztők</span>
                                    </div>
                                    <div class="flex flex-col justify-center items-center hover:cursor-pointer">
                                        <img src="https://img.m2icondb.com/50624.png" alt="Kohózott réz" class="">
                                        <span class="text-sm text-gray-400/90 font-semibold">Kohók</span>
                                    </div>

                                    <div class="flex flex-col justify-center items-center hover:cursor-pointer"
                                        @click="searchQuery = 'bab'">
                                        <img src="https://img.m2icondb.com/100400.png" alt="Sárkánykő Alkímia" class="">
                                        <span class="text-sm text-gray-400/90 font-semibold">Alkímia</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div
                                class="searchtitle flex justify-center w-full mb-2 h-fit border-t-2 border-b-2 border-t-slate-500/85 border-b-slate-500/85 mt-1 rounded-t-md rounded-b-md shadow-lg shadow-gray-950/50">
                                <label class="w-full h-full py-2 rounded-b-sm rounded-t-sm mx-auto bg-stone-500/35"
                                    for="itemname">Keresés Név alapján</label>
                            </div>

                            <div class="w-full h-full mx-auto rounded-bl-md mt-6">
                                <div class="flex w-full h-fit gap-2 mx-auto align-middle justify-center">
                                    <input v-model="searchQuery" type="text" placeholder="Keresés..."
                                        class="mb-4 px-3 py-2 w-1/2 rounded-md text-center bg-black border border-gray-600 text-white" />
                                    <button
                                        class="w-1/3 px-4 rounded-md mb-4 bg-stone-600/65 border-2 border-stone-300/55 text-white font-semibold"
                                        type="submit">
                                        Keresés
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="tablebg min-h-[40dvh] md:min-h-[50dvh] lg:min-h-[60dvh] col-span-2 lg:col-span-4 overflow-hidden">
                        <div class="tablecontent bg-slate-950/85 w-full h-full">
                            <table
                                class="w-[97%]  bg-slate-800/85 mx-auto text-white text-sm font-medium rounded-b-lg overflow-hidden">
                                <thead class="searchtitle rounded-b-lg">
                                    <tr class="border-b-2 border-b-black/60 bg-stone-500/30 overflow-hidden">
                                        <th class="px-4 py-2 font-semibold text-base tracking-wider text-center"
                                            style="font-family: 'Nunito';">Tétel</th>
                                        <th class="px-4 py-2 font-semibold text-base tracking-wider text-center"
                                            style="font-family: 'Nunito';">Mennyiség</th>
                                        <th class="px-4 py-2 font-semibold text-base tracking-wider text-center"
                                            style="font-family: 'Nunito';">Won</th>
                                        <th class="px-4 py-2 font-semibold text-base tracking-widest text-center"
                                            style="font-family: 'Nunito';">Yang</th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="mx-auto border-x-2 border-b-2 border-gray-700/70 text-white text-sm font-medium overflow-hidden">
                                    <tr v-if="searchQuery != '' && filteredItems.length < 20"
                                        v-for="item in filteredItems" :key="item.name"
                                        class=" even:bg-gradient-to-r from-stone-950/5 via-stone-950/25 to-stone-950/5">
                                        <td class="p-2 text-left font-semibold tracking-wider">{{ item.name }}
                                        </td>
                                        <td>
                                            <img :src="item.icon" :alt="item.name">
                                        </td>

                                        <td class="p-2 text-center font-semibold tracking-wider">
                                            {{ item.quantity ?? 1 }}
                                        </td>

                                        <td class="p-2 text-center text-base font-bold tracking-wider text-sky-400"
                                            style="font-family: 'Nunito';">
                                            {{ Math.floor(item.price) }}
                                        </td>
                                        <!-- Yang -->
                                        <td class="p-2 text-center font-semibold tracking-wider text-gray-200">
                                            {{ Math.round((item.price - Math.floor(item.price)) * 100) }} m
                                        </td>
                                    </tr>
                                    <tr v-if="searchQuery == ''"
                                        class="lg:h-[55dvh] w-full bg-gradient-to-b from-stone-400/5 via-stone-200/15 to-stone-400/5">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
                <div class="footer w-full h-full">

                </div>

            </div>


            <div class="flex items-center flex-row space-x-6 ">
                <select v-model="newItem.name" class="text-black font-semibold py-1 px-3 rounded-lg">
                    <option disabled value="">Válassz tételeket</option>
                    <option v-for="item in itemOptions" :key="item.name" :value="item.name">
                        {{ item.name }}
                    </option>
                </select>

                <div>
                    <!-- Vásárlási ár -->
                    <input v-model="newItem.price" type="number" min="0"
                        class="text-black font-semibold py-1 rounded-lg text-end align-bottom max-w-40 tracking-widest mr-2" /><span
                        class="font-semibold text-xl">w</span>
                </div>

                <div>
                    <!--Mennyiség -->
                    <input v-model.number="newItem.quantity" type="number" min="1"
                        class="text-black font-semibold py-1 pr-2 rounded-lg text-end align-bottom max-w-20 tracking-widest mr-2" />
                    <span class="font-semibold text-lg">db</span>
                </div>


                <button @click="addItem"
                    class="px-4 py-2 bg-yellow-400 font-bold text-black rounded-lg hover:bg-yellow-500">
                    Tétel hozzáadása
                </button>
            </div>

            <div class="container max-w-[1200px] min-w-fit mt-16 h-full mx-auto">
                <AddItemToCalculator :itemList="itemList" :totalAmount="totalAmount" />
            </div>
        </div>



    </div>

    <div class="container text-slate-400 text-center italic my-2 mx-auto">
        <p>Special thanks for the icons visualisations <a href="https://m2icondb.com/">@Metin2 Icon Database</a>
        </p>
    </div>

    <BaseFooter />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cookie&family=DynaPuff:wght@400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Onest:wght@100..900&display=swap');

.head {
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNdL5YTyBrbJvbwWqM2vf5gkz0ufL16GdWZA&s');
    background-size: contain;
    background-position: center;
}

.firstcolumn {
    background-image: url('https://static.vecteezy.com/system/resources/previews/005/490/479/non_2x/black-abstract-textured-grunge-web-background-vector.jpg');
    background-size: cover;
    background-position: center;
}

.searchtitle {
    background-image: url('https://www.shutterstock.com/image-photo/dark-grey-black-slate-background-600nw-415637020.jpg');
    background-size: cover;
    background-position: center;
}

.tablebg {
    background-image: url('https://cdn.wallpapersafari.com/93/73/KIm7zO.jpg');
    background-size: contain;
    background-position: center;
}
</style>