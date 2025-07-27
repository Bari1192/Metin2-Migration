<script setup>
import { ref } from "vue";

const flipped = ref(false);
const isExpanded = ref(false);

const props = defineProps({
  listItems: {
    type: Array,
    required: true
  },
  title_CTA: {
    type: String,
    required: true,
    default: "Ezt se hagyd ki!"
  },
  TitleDiscountPercent: {
    type: String,
    required: true,
    default: "Őrületes Kuponok!"
  },
  frontTitle: {
    type: String,
    required: true
  },
  backText: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: "🎁"
  },
});

const toggleState = () => {
  isExpanded.value = !isExpanded.value;
  flipped.value = isExpanded.value;
};
</script>

<template>
  <div class="mx-auto h-full min-h-[75svh] min-w-[screen] bg-slate-950 flex flex-col 
  justify-center items-center rounded-t-lg rounded-b-lg
 border-t-2 border-sky-300/40 border-b-2" style="font-family: 'Nunito';">

    <div class="w-full max-w-[screen] mx-auto py-14 px-4">

      <div class="grid grid-cols-1 md:grid-cols-7 lg:gap-8 items-center">
        <!-- 1. Üres bal oldali térköz -->
        <div class="block"></div>

        <!-- 2. Title, lista, desktop gomb -->
        <div class="p-4 flex flex-col md:col-span-3 lg:col-span-3 w-full gap-2 mb-4">
          <p class="text-2xl font-bold text-orange-400 mb-4 border-b-4 rounded-xl border-orange-50/75 pb-2 md:pb-3 lg:pb-2 lg:px-2 w-fit"
            style="font-family: Nunito;">
            {{ title_CTA }}
          </p>
          <div class="flex flex-col">
            <ul class="list-disc text-slate-300 pl-6 space-y-2 text-lg w-full md:mb-4">
              <li v-for="(item, index) in listItems" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
          <!-- Csak DESKTOP-on (md-től) -->
          <div class="hidden md:flex justify-center">
            <button @click="toggleState"
              class="px-6 py-2 font-semibold tracking-wide bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full md:w-auto">
              Bővebben▼
            </button>
          </div>
        </div>
        <!-- 4. Kártya -->
        <div class="flex flex-col items-center col-span-2 w-full h-full">
          <div class="flex justify-center items-center w-full h-full md:ml-8" @click="toggleState">
            <div tabindex="0" role="button" :aria-pressed="flipped"
              class="kupon-perspective w-[180px] h-[260px] md:w-[220px] md:h-[300px] mx-auto cursor-pointer outline-none"
              :style="{ transform: flipped ? 'rotateY(0deg) rotateZ(6deg) scale(1.04)' : 'rotateY(-12deg) rotateZ(-6deg) scale(1.03)', transition: 'transform 0.5s cubic-bezier(.46,.96,.72,1.14)' }">
              <div class="kupon-flip-container " :class="{ flipped }">
                <!-- Fronton -->
                <div class="kupon-face kupon-front bg-white">
                  <div class="flex flex-col items-center gap-3">
                    <div
                      class="mt-1 px-2 py-1 border-orange-200 transition text-sm lg:text-xl text-black font-extrabold text-center"
                      style="font-family: Nunito;">
                      {{ TitleDiscountPercent }}
                    </div>
                    <div class="text-5xl mb-1">{{ icon }}</div>
                    <div class="font-bold text-black text-sm lg:text-lg text-center mb-1 uppercase lg:tracking-wider">
                      {{ frontTitle }}
                    </div>
                    <div
                      class="mt-1 p-2 bg-orange-400 border border-orange-200 transition text-sm md:text-base text-slate-00 font-bold text-center hover:bg-orange-400 hover:text-white rounded-lg shadow-md shadow-black/35">
                      Kattints a részletekért!
                    </div>
                  </div>
                </div>
                <!-- Back -->
                <div class="kupon-face kupon-back bg-white text-black">
                  <div class="flex flex-col items-center gap-2 px-3 py-4">
                    <div class="text-black font-semibold text-lg text-center mb-2">
                      {{ backText }}
                    </div>
                    <div class="mt-2 text-gray-800 text-center">
                      <p class="pb-2 font-extrabold text-xl mb-2">🎉 <span
                          class="underline underline-offset-4 text-base">Extra kupon:</span></p>
                      <span class="bg-black/80 text-orange-400 font-extrabold py-1 px-3 italic rounded-md"> ASD123456
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Csak MOBILON jelenik meg >> Gomb a kártya alatt! -->
          <div class="flex md:hidden w-fit sm:mt-6 justify-center md:w-full">
            <button @click="toggleState" class="moredetails px-6 py-2 font-semibold tracking-wide bg-orange-500 text-white rounded-md hover:bg-orange-600
               w-full">
              Bővebben▼
            </button>
          </div>
        </div>

        <!-- 5. térköz -->
        <div class="hidden lg:block"></div>
      </div>
    </div>

    <transition name="expand" class="mb-12">
      <div v-show="isExpanded"
        class="flex flex-col place-items-start overflow-hidden w-11/12 max-w-[screen] mt-6 bg-slate-700/70 p-8 rounded-xl shadow-sm shadow-orange-300 md:w-3/5">
        <h3
          class="text-lg md:text-xl mb-4 text-amber-600 bg-white p-2 rounded-xl underline underline-offset-4 tracking-wide uppercase font-bold">
          Rövid, és <b>hasznos</b> részletek:
        </h3>
        <p class="text-slate-200 leading-6">
          <slot />
        </p>
      </div>
    </transition>
  </div>
</template>

<style>
.kupon-perspective {
  perspective: 1000px;
  will-change: transform;
  user-select: none;
}

.kupon-flip-container {
  position: relative;
  border-radius: 1.2rem;
  border: 4px solid #fb923c;
  background: #fef3c7;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(.46, .96, .72, 1.14);
  margin: auto;

  @media (max-width: 550px) {
    width: 85%;
    height: 85%;
  }

  @media (min-width: 551px) and (max-width: 767px) {
    width: 95%;
    height: 95%;
  }

  @media (min-width: 768px) {
    width: 100%;
    height: 100%;
  }
}

.moredetails {
  @media (min-width:550px) and (max-width: 640px) {
    margin-top: 12px;
  }
}

.clickmore {
  @media (min-width:640px) and (max-width: 764px) {
    min-width: 100%;
  }
}

.kupon-flip-container.flipped {
  transform: rotateY(180deg);
}

.kupon-face {
  position: absolute;
  inset: 0;
  border-radius: 1.1rem;
  box-shadow: 0 8px 28px rgba(251, 146, 60, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  background: #fff;
}

.kupon-back {
  transform: rotateY(180deg);
  transition: all 1s ease;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 1s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>