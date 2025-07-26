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
  <div class="h-full min-h-[75svh] min-w-[screen] bg-slate-900 flex flex-col justify-center items-center rounded-t-lg rounded-b-lg
    border-t-2 border-sky-300/40 border-b-2" style="font-family: 'Nunito';">

    <div class="h-full w-full flex lg:flex-row gap-8 items-center justify-between max-w-[1500px] mx-auto
      bg-slate-900 py-14 px-4 rounded-xl">
      <div class="flex-1 flex justify-center align-middle items-center " @click="toggleState">
        <div tabindex="0" role="button" :aria-pressed="flipped"
          class="kupon-perspective w-[180px] h-[260px] md:w-[220px] md:h-[300px] mx-auto cursor-pointer outline-none"
          :style="{
            transform: flipped
              ? 'rotateY(0deg) rotateZ(-6deg) scale(1.04)'
              : 'rotateY(-12deg) rotateZ(6deg) scale(1.03)',
            transition: 'transform 0.5s cubic-bezier(.46, .96, .72, 1.14)',
          }">
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
            <!-- hátoldal -->
            <div class="kupon-face kupon-back bg-white text-black">
              <div class="flex flex-col items-center gap-2 px-3 py-4">
                <div class="text-black font-semibold text-lg text-center mb-2">
                  {{ backText }}
                </div>
                <div class="mt-2 text-gray-800 text-center">
                  <p class="pb-2 font-extrabold text-xl mb-2">🎉 <span class="underline underline-offset-4 text-base">Extra kupon:</span></p>
                  <span class="bg-black/80 text-orange-400 font-extrabold py-1 px-3 italic rounded-md"> ASD123456 </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Jobboldali felsorolásos rész -->
      <div class="flex-1 w-full h-full mx-auto">
        <p class="text-2xl font-bold text-orange-400 mb-4 border-b-4 rounded-xl border-orange-50/75 pb-1 max-w-fit"
          style="font-family: Nunito;">
          {{ title_CTA }}
        </p>
        <ul class="list-disc text-slate-300 pl-4 space-y-2 text-lg">
          <!-- Ide :item -ként majd megadjuk, mi fog menni a listába -->
          <li v-for="(item, index) in listItems" :key="index">
            {{ item }}
          </li>
        </ul>
        <button @click="toggleState"
          class="mt-8 px-4 py-2 font-semibold tracking-wide bg-orange-500 text-white rounded-md hover:bg-orange-600">
          Bővebben ▼
        </button>
      </div>
    </div>

    <transition name="expand" class="mb-12">
      <div v-show="isExpanded"
        class="flex-2 flex-col place-items-start overflow-hidden max-w-[1500px] mt-6 bg-slate-700/70 p-8 rounded-md w-3/5">
        <h3
          class="text-xl mb-4 text-amber-600 bg-white p-2 rounded-xl underline underline-offset-4 tracking-wide uppercase font-bold">
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
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
  border: 4px solid #fb923c;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(.46, .96, .72, 1.14);
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
}

.kupon-back {
  transform: rotateY(180deg);
  transition: all 1s ease;
}

/* Expand Transition */
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