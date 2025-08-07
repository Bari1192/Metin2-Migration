<script setup>
import BaseHeader from '@components/layout/BaseHeader.vue';
import BaseFooter from '@components/layout/BaseFooter.vue';
import BaseSpinner from '@components/layout/BaseSpinner.vue'
import PolskaFlag from '@assets/svgs/PolskaFlag.vue';
import HungaryFlag from '@assets/svgs/HungaryFlag.vue';
import { storeToRefs } from 'pinia';
import { useHungaryStore } from '@stores/HungaryItemsStore.mjs';
import { onMounted } from 'vue';

const itemStore = useHungaryStore();
const { searchQuery, paginatedItems, error, loading } = storeToRefs(itemStore);

onMounted(async () => {
    await itemStore.getItems();
});
const formatNumber = (num) => {
    if (num == null || num === "") return "";
    return num.toLocaleString("hu-HU");
};
</script>

<template>
    <BaseHeader />

    <div class="px-4 container w-full min-h-screen mx-auto text-white text-center">

        <div class="mt-8 w-full h-full">
            <div class="container w-full h-full mx-auto px-8">
                <div class="w-full h-full mx-auto flex justify-center">
                    <h1 class="mx-auto text-3xl leading-10 font-extrabold tracking-wider space-y-4 text-center">
                        <p>Betekintenél más szerver piacára átváltás előtt?</p>
                        <p>Érdekel egy tárgy ára, de nem elérhető a betekintés üvege?</p>
                    </h1>
                </div>
                <div class="w-full h-full mx-auto flex justify-center mt-4">
                    <p class="mx-auto text-lg italic tracking-wider text-start">
                        Összegyűjtöttem számodra az általam tapasztalakat, hogy neked már ne kelljen!</p>
                </div>
            </div>

            <div v-if="!loading" class="mx-2 w-fit container my-8 lg:w-full h-full lg:mx-auto justify-center 
            rounded-t-lg rounded-b-lg border-2 shadow-lg shadow-indigo-950 border-indigo-900/75
            border-b-4 border-r-4 border-r-indigo-900/90 border-b-indigo-900/90
            ">
                <div class="head min-h-[5dvh] w-full h-full border-b-4 border-stone-400 rounded-t-md overflow-hidden ">

                    <div
                        class="absolute top-0 right-0 bg-gray-800 text-slate-100 text-[8px] lg:text-[8px] px-2 py-0 leading-none lg:py-1 rounded-l-md">
                        version: 1.0.0
                    </div>

                    <div class="text-2xl py-5 font-extrabold tracking-wider bg-stone-950/65"
                        style="font-family: 'Noto Serif',Arial, Helvetica, sans-serif;">
                        Tárgyak & Árak keresése
                        <div
                            class="top-2.5 left-0 opacity-65 relative block -z-5 w-fit bg-gray-600  py-1 px-2 rounded-r border-l-8 border-gray-400">
                            <p class=" text-white text-xs md:text-xs font-base"
                                style="font-family: 'Onest',Arial, Helvetica, sans-serif;"> Utoljára frissítve:
                                2025.07.06</p>
                        </div>
                    </div>
                </div>


                <div
                    class="mx-auto body h-full md:min-h-[55dvh] lg:min-h-[80dvh] grid grid-cols-3 lg:grid-cols-5 overflow-hidden">

                    <div
                        class="firstcolumn-secondlayer md:px-3 bg-slate-900/80 rounded-b-lg w-full h-full flex flex-col justify-between text-center">
                        <div>
                            <div
                                class="searchtitle md:mt-4 flex justify-center w-full h-fit border-t-2 border-b-2 border-t-slate-500/85 border-b-slate-500/85  rounded-t-md rounded-b-md shadow-lg shadow-gray-950/50">
                                <p class="w-full h-full py-2 rounded-b-sm rounded-t-sm mx-auto bg-stone-500/35 ">
                                    Szerver kiválasztása
                                </p>
                            </div>

                            <div class="h-fit w-full flex justify-center mx-auto">
                                <div
                                    class="flex justify-center items-center gap-2 lg:gap-5 md:gap-2 mx-auto mt-4 align-middle">
                                    <div
                                        class="flex flex-col justify-center items-center opacity-50 cursor-not-allowed">
                                        <PolskaFlag class="w-4 h-4 md:w-8 md:h-8 opacity-90" />
                                        <span
                                            class="text-[8px] md:text-sm lg:text-base text-gray-400/90 font-semibold pt-1">Lengyel</span>
                                    </div>
                                    <div class="mx-auto w-[2px] h-[80%] bg-slate-400/25">
                                    </div>
                                    <div class="flex flex-col justify-center items-center">
                                        <HungaryFlag class="w-4 h-4 md:w-8 md:h-8 opacity-90" />
                                        <span
                                            class="text-[8px] md:text-sm lg:text-base xl:text-lg text-yellow-400/90 font-semibold pt-1">Magyar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                class="searchtitle mt-3 flex justify-center w-full h-fit border-t-2 border-b-2 border-t-slate-500/85 border-b-slate-500/85 rounded-t-md rounded-b-md shadow-lg shadow-gray-950/50">
                                <p
                                    class="text-sm md:text-base w-full h-full py-2 rounded-b-sm rounded-t-sm mx-auto bg-stone-500/35">
                                    Szűrés kategóriákra
                                </p>
                            </div>

                            <div class="h-fit w-full flex justify-center mx-auto mt-1 px-2 lg:mt-3">
                                <div
                                    class="grid grid-cols-3 lg:mx-2 w-full justify-between gap-2 items-center lg:gap-4 align-middle">
                                    <div class="my-2 lg:my-0 w-fit flex flex-col gap-y-0.5 justify-center items-center hover:cursor-pointer mx-auto"
                                        @click="itemStore.setCategory('vert')">
                                        <img src="https://img.m2icondb.com/12010.png" alt="Vért" title="Vért"
                                            class="h-8 w-4 md:h-10 md:w-6">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Vért</span>
                                    </div>
                                    <div class="flex px-1 flex-col justify-center items-center hover:cursor-pointer"
                                        @click="itemStore.setCategory('fegyver')">
                                        <img src="https://img.m2icondb.com/00360.png" alt="Fegyver" title="Fegyverek"
                                            class="h-8 w-4 md:h-10 md:w-6">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Fegyver</span>
                                    </div>
                                    <div
                                        class="flex flex-col justify-center items-center opacity-50 cursor-not-allowed">
                                        <img src="https://img.m2icondb.com/41002.png" alt="Jelmez" title="Jelmez"
                                            class="h-8 w-4 md:h-10 md:w-6">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Jelmez</span>
                                    </div>
                                </div>
                            </div>

                            <div class="w-[90%] h-[2px] bg-slate-400/5 mx-auto my-1"></div>

                            <div class="h-fit w-full flex justify-between mx-auto lg:mt-3 px-2">
                                <div
                                    class="grid grid-cols-3 lg:mx-2 w-full justify-between items-center lg:gap-4 align-middle">

                                    <div class="my-2 lg:my-0 w-fit flex flex-col gap-y-0.5 justify-center items-center hover:cursor-pointer mx-auto"
                                        @click="itemStore.setCategory('italok')">
                                        <img src="https://img.m2icondb.com/27102.png" alt="Ital" title="Ital"
                                            class="w-6 h-6 md:w-auto md:h-auto">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Ital</span>
                                    </div>
                                    <div class="my-2 lg:my-0 w-fit flex flex-col gap-y-0.5 justify-center items-center hover:cursor-pointer mx-auto"
                                        @click="itemStore.setCategory('ekszer')">
                                        <img src="https://img.m2icondb.com/14500.png" alt="Ékszer" title="Ékszerek"
                                            class="w-6 h-6 md:w-auto md:h-auto">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Ékszer</span>
                                    </div>
                                    <div class="my-2 lg:my-0 w-fit flex flex-col gap-y-0.5 justify-center items-center hover:cursor-pointer mx-auto"
                                        @click="itemStore.setCategory('virag')">
                                        <img src="https://img.m2icondb.com/50701.png" alt="Virág" title="Virág"
                                            class="w-6 h-6 md:w-auto md:h-auto">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Virág</span>
                                    </div>
                                </div>
                            </div>

                            <div class="w-[90%] h-[2px] bg-slate-400/5 mx-auto my-1"></div>

                            <div class="h-fit w-full flex justify-between mx-auto lg:mt-3 px-2">
                                <div
                                    class="grid grid-cols-3 lg:mx-2 w-full justify-between items-center lg:gap-4 align-middle">

                                    <div class="my-2 lg:my-0 w-fit flex flex-col gap-y-0.5 justify-center items-center hover:cursor-pointer mx-auto"
                                        @click="itemStore.setCategory('lada')">
                                        <img src="https://img.m2icondb.com/50011.png" alt="Láda" title="Ládák"
                                            class="w-6 h-6 md:w-auto md:h-auto">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Láda</span>
                                    </div>
                                    <div class="my-2 lg:my-0 w-fit flex flex-col gap-y-0.5 justify-center items-center hover:cursor-pointer mx-auto"
                                        @click="itemStore.setCategory('talizmanok')">
                                        <img src="https://img.m2icondb.com/9830.png" alt="Talizmán" title="Talizmán"
                                            class="w-6 h-6 md:w-auto md:h-auto">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Talizmán</span>
                                    </div>
                                    <div class="my-2 lg:my-0 w-fit flex flex-col gap-y-0.5 justify-center items-center hover:cursor-pointer mx-auto"
                                        @click="itemStore.setCategory('targypiac')">
                                        <img src="https://img.m2icondb.com/80016.png" alt="Tárgypiac" title="Tárgypiac"
                                            class="w-6 h-6 md:w-auto md:h-auto">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Tárgypiac</span>
                                    </div>
                                </div>
                            </div>

                            <div class="w-[90%] h-[2px] bg-slate-400/5 mx-auto"></div>

                            <div class="h-fit w-full flex justify-between mx-auto lg:mt-3 px-2">
                                <div
                                    class="grid grid-cols-3 lg:mx-2 w-full justify-between gap-2 items-center lg:gap-4 align-middle">

                                    <div class="my-2 lg:my-0 flex flex-col justify-center items-center hover:cursor-pointer"
                                        @click="itemStore.setCategory('fejlesztes')">
                                        <img src="https://img.m2icondb.com/25040.png" alt="fejlesztési tárgyak"
                                            title="fejlesztési tárgyak" class="w-6 h-6 md:w-auto md:h-auto">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Fejlesztés</span>
                                    </div>
                                    <div class="my-2 lg:my-0 flex flex-col justify-center items-center hover:cursor-pointer"
                                        @click="itemStore.setCategory('koho')">
                                        <img src="https://img.m2icondb.com/50624.png" alt="Kohózott réz" title="Kohók"
                                            class="w-6 h-6 md:w-auto md:h-auto">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Kohó</span>
                                    </div>

                                    <div class="my-2 lg:my-0 flex flex-col justify-center items-center hover:cursor-pointer"
                                        @click="itemStore.setCategory('alkimia')">
                                        <img src="https://img.m2icondb.com/100400.png" alt="Sárkánykő Alkímia"
                                            title="Sárkánykő Alkímia" class="w-6 h-6 md:w-auto md:h-auto">
                                        <span
                                            class="text-[8px] sm:text-xs md:text-sm xl:text-base text-gray-400/90 font-semibold">Alkímia</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="searchtitle mt-3 lg:mt-0 flex justify-center w-full mb-2 h-fit border-t-2 border-b-2 border-t-slate-500/85 border-b-slate-500/85
                                 rounded-t-md rounded-b-md shadow-lg shadow-gray-950/50">
                                <label
                                    class="text-sm md:text-base w-full h-full py-2 rounded-b-sm rounded-t-sm mx-auto bg-stone-500/35"
                                    for="itemname">Kézi keresés</label>
                            </div>

                            <div class="w-full h-full mx-auto rounded-bl-md my-3 lg:mt-6">
                                <div class="flex px-1 w-full h-fit gap-2 lg:mx-auto align-middle justify-center">
                                    <input v-model="searchQuery" type="text" placeholder="Kezdd el gépelni..."
                                        class=" w-full text-[7px] md:text-sm xl:text-base px-3 py-2 rounded-md text-center bg-black border border-gray-600 text-white" />
                                </div>
                                <p
                                    class="w-full text-[9px] lg:text-[13px] lg:py-1 text-gray-300 lg:text-gray-400 text-center italic font-extrathin mt-2">
                                    Kezdd
                                    el begépelni a keresett tárgyat!</p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="tablebg min-h-[40dvh] md:min-h-[50dvh] lg:min-h-[60dvh] col-span-2 lg:col-span-4 overflow-hidden">
                        <div class="tablecontent bg-slate-950/85 w-full h-full ">
                            <table
                                class="w-[95%] bg-slate-800/85 mx-auto text-white lg:font-medium rounded-b-lg overflow-hidden">
                                <thead class="searchtitle rounded-b-lg">
                                    <tr class="border-b-2 border-b-black/60 bg-stone-500/30 overflow-hidden">
                                        <th class="p-0 m-0 w-fit text-center text-xs
                                        lg:px-4 py-2 lg:font-semibold lg:text-base lg:tracking-wider lg:text-left
                                        xl:text-lg"
                                            style="font-family: 'Nunito';">Tétel</th>
                                        <th class="hidden sm:block w-fit" style="font-family: 'Nunito';"></th> 
                                        <th class="px-1.5 m-0 w-fit text-xs xl:text-lg lg:px-4 py-2 lg:font-semibold lg:text-base lg:tracking-wider text-center"
                                            style="font-family: 'Nunito';">Darab</th>
                                        <th class="px-1.5 m-0 w-fit text-xs xl:text-lg lg:px-4 py-2 lg:font-semibold lg:text-base lg:tracking-wider text-center"
                                            style="font-family: 'Nunito';">Won</th>
                                        <th class="px-1.5 m-0 w-fit text-xs xl:text-lg lg:px-4 py-2 lg:font-semibold lg:text-base lg:tracking-wider text-center"
                                            style="font-family: 'Nunito';">Yang</th>
                                    </tr>
                                </thead>
                                <tbody class="mx-auto text-[8px] md:text-sm lg:text-base border-x-2 border-b-2 border-gray-700/70 text-white lg:font-medium 
                                    overflow-hidden                                    ">
                                    <tr v-if="searchQuery.value != '' && paginatedItems.length < 50 && paginatedItems.length != 0"
                                        v-for="item in paginatedItems" :key="item.name"
                                        class=" even:bg-gradient-to-r from-stone-950/5 via-stone-950/25 to-stone-950/5">

                                        <td
                                            class="pr-1 lg:p-2 pl-2 md:pl-1.5 md:px-1 text-left lg:font-semibold lg:tracking-wider max-w-fit">
                                            {{ item.name }}
                                        </td>
                                        <td class="hidden sm:block px-1 lg:p-2 text-left lg:font-semibold lg:tracking-wider max-w-fit mx-auto"
                                            v-if="item.icon">
                                            <img :src="item.icon" :alt="item.name" :title="item.name"
                                                :class="item.group == 'vért' || item.group == 'fegyver' ? 'h-6 w-4 md:h-8 md:w-5 lg:h-10 lg:w-6 mx-auto' : 'p-1 max-h-6 max-w-6 lg:max-w-12 lg:max-h-8 lg:py-0.5'">
                                        </td>
                                        <td v-else
                                            class="px-1 lg:p-2 text-left lg:font-semibold lg:tracking-wider max-w-fit mx-auto">
                                            <!--  -->
                                        </td>
                                        <td class="px-1 lg:p-2 lg:font-semibold lg:tracking-wider max-w-fit text-center"
                                            :class="item.quantity && item.quantity == 200 ? 'text-yellow-400' : 'text-white'">
                                            {{ item.quantity ?? 1 }}
                                        </td>

                                        <td class="p-2 text-center font-bold tracking-wider text-sky-400"
                                            :class="item.price == 0 ? 'text-slate-400' : ''"
                                            style="font-family: 'Nunito';">
                                            {{ item.price ? item.price : 0 }}
                                        </td>
                                        <!-- Yang -->
                                        <td class="p-2 text-center font-semibold tracking-wider"
                                            :class="item.price_yang === 0 ? ' text-slate-400' : ' text-gray-200'">
                                            {{ item.price_yang ? formatNumber(item.price_yang) : 0 }}
                                        </td>
                                    </tr>
                                    <tr v-if="searchQuery == '' && paginatedItems.length < 1"
                                        class="lg:h-[55dvh] w-full bg-gradient-to-b from-stone-400/5 via-stone-200/15 to-stone-400/5">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div
                                class="flex w-11/12 md:w-2/3 mx-auto lg:w-1/3 justify-center items-center  gap-4 mt-4 font-semibold">
                                <button @click="itemStore.prevPage()" class="prevbutton w-full h-full min-h-[40px] rounded-md border-2 
                                text-xs p-0.5
                                md:text-sm md:px-2
                                lg:py-2 lg:px-4" 
                                :class="itemStore.currentPage === 1 ? 'opacity-65 text-gray-300 border-slate-600' : 'text-white border-slate-500/90'"
                                    :disabled="itemStore.currentPage === 1">
                                    Előző oldal
                                </button>
                                <span class="pageAmount w-full lg:h-full h-full min-h-[40px] md: tracking-wider rounded-md border-2 border-slate-500/90
                                 text-xs gap-0.5 px-1 py-0.5 items-center 
                                 md:text-sm md:gap-0 md:min-h-[35px]
                                 lg:py-2 flex flex-row lg:px-4 lg:block">
                                    <span class="text-amber-400 h-full w-full">{{ itemStore.currentPage }}</span>
                                    <span class="text-white w-full h-full"> / </span>
                                    <span class="text-gray-100 w-full h-full">{{ itemStore.totalPages }}</span>
                                </span>
                                <button @click="itemStore.nextPage()" class="nextButton w-full h-full min-h-[40px] rounded-md border-2 border-slate-500/90
                                    text-xs p-0.5
                                    md:text-sm md:px-2
                                    lg:py-2 lg:px-4
                                    hover:border-sky-400/75 duration-200 ease-in-out"
                                     :class="itemStore.currentPage === itemStore.totalPages ? 'opacity-65 text-gray-300 border-slate-600' : 'text-white border-slate-500/90'"
                                    :disabled="itemStore.currentPage === itemStore.totalPages">Következő</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="w-full mx-auto min-h-[50svh] flex flex-col items-center justify-center ">
                <BaseSpinner />
                <p class="w-full mt-4 font-medium">Adatok betöltés folyamatban...</p>
            </div>
        </div>
    </div>

    <div class="container text-slate-400 text-sm text-center italic my-8 mx-auto opacity-50">
        <p>Special thanks for the icons visualisations</p>
        <p><a class="bg-slate-100/10 px-1 rounded-md" href="https://m2icondb.com/">@Metin2 Icon Database</a></p>
    </div>

    <BaseFooter />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cookie&family=DynaPuff:wght@400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Onest:wght@100..900&display=swap');

.head {
    background-image: url('@assets/img/marketSearching/table_header.jpg');
    background-size: contain;
    background-position: center;
}

.firstcolumn {
    background-image: url('@assets/img/marketSearching/firstcolumn.jpg');
    background-size: cover;
    background-position: center;
}

.searchtitle {
    background-image: url('@assets/img/marketSearching/searchtitle.webp');
    background-size: cover;
    background-position: center;
}

.prevbutton,
.pageAmount,
.nextButton {
    background-image: url('@assets/img/marketSearching/searchtitle.webp');
    background-size: cover;
    background-position: center;
}

.tablebg {
    background-image: url('@assets/img/marketSearching/table.webp');
    background-size: contain;
    background-position: center;
}
</style>