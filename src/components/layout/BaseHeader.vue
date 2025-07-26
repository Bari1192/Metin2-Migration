<template>
  <nav class="bg-slate-900/50">
    <div
      class="lg:w-full lg:flex mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center p-3 border-b-4 border-b-slate-800">
      <!-- LOGO & HAMBURGER -->
      <div class="flex justify-center items-center w-full lg:w-auto">
        <RouterLink to="/" class="flex justify-start">
          <div class="flex flex-col items-center gap-2 ">
            <img src="../../assets/img/logos/GrayZone_logo.png" alt="GrayZone Logo"
              class="logo w-40 h-20 object-contain" />
            <div class="logo-text text-center">
              <p class="text-base pt-1 lg:mt-0">
                Calculate & Moving</p>
            </div>
          </div>
        </RouterLink>
        <!-- Hamburger lg ALATT! -->
        <button class="hambuger-menu lg:hidden ml-auto text-rose-500" @click="toggleMenu" aria-label="Menü megnyitása">
          <svg class="w-10 h-10 sm:w-11 sm:h-11 md:h-12 md:w-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>

      <!-- DESKTOP - LG-től!! -->
      <ul class="hidden lg:flex flex-1 flex-row flex-wrap justify-end items-center gap-4 w-full">

        <li class="nav-item">
          <RouterLink to="/movingcalculator" class="movingcalculator" @click="toggleMenu">
            <div class="nav-link secondary-gradient">
              <i class="fa-solid fa-calculator mr-2"></i>
              <p class="movingcalculator">Moving Calculator</p>
            </div>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/marketsearch" @click="toggleMenu">
            <div class="nav-link tertiary-gradient">
              <i class="fa-solid fa-magnifying-glass mr-2"></i>
              <p class="movingcalculator">Market Searching</p>
            </div>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/news1">
            <div class="nav-link-subtle">
              <i class="fas fa-info-circle mr-2"></i>
              <p class="aboutus">About Us</p>
            </div>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/news2" class="info-link">
            <div class="nav-link-subtle">
              <i class="fas fa-users mr-2"></i>
              <p class="whoweare">Who We Are</p>
            </div>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/news3" class="info-link">
            <div class="nav-link-subtle">
              <i class="fas fa-headset mr-2"></i>
              <p class="support">Support</p>
            </div>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/news3">
            <div class="dashboard-icon">
              <i class="fa-solid fa-chalkboard"></i>
            </div>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/news">
            <button class="action-button">
              <i class="fa-solid fa-magnifying-glass mr-2"></i>
              Show On News
            </button>
          </RouterLink>
        </li>
      </ul>

      <!-- MOBILE Menu -->
      <div class="menu-container" :class="menuOpen ? 'translate-x-0' : '-translate-x-full'">
        <!-- Background Overlay -->
        <div class="menu-overlay" @click="toggleMenu"></div>
        <!-- Navigation -->
        <nav class="mobile-nav bg-slate-900">
          <button class="ml-auto mb-4 close-btn" @click="toggleMenu" aria-label="Bezárás">
            <svg class="w-8 h-8 mt-4 ml-4 text-red-600 bg-slate-100/85 rounded-full" xmlns="http://www.w3.org/2000/svg"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul class="nav-item-group mx-3">
            <li class="nav-item">
              <RouterLink to="/movingcalculator" class="movingcalculator" @click="toggleMenu">
                <div class="nav-link secondary-gradient">
                  <i class="fa-solid fa-calculator mr-2"></i>
                  <p class="movingcalculator">Moving Calculator</p>
                </div>
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/marketsearch" @click="toggleMenu">
                <div class="nav-link tertiary-gradient">
                  <i class="fa-solid fa-magnifying-glass mr-2"></i>
                  <p class="movingcalculator">Market Searching</p>
                </div>
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/news1">
                <div class="nav-link-subtle">
                  <i class="fas fa-info-circle mr-2"></i>
                  <p class="aboutus">About Us</p>
                </div>
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/news2" class="info-link">
                <div class="nav-link-subtle">
                  <i class="fas fa-users mr-2"></i>
                  <p class="whoweare">Who We Are</p>
                </div>
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/news3" class="info-link">
                <div class="nav-link-subtle">
                  <i class="fas fa-headset mr-2"></i>
                  <p class="support">Support</p>
                </div>
              </RouterLink>
            </li>
            <li>
              <button class="ml-auto mb-4 close-btn" @click="toggleMenu" aria-label="becsukás">
                 <div class="nav-link-subtle">
                <i class="fa-solid fa-door-open mr-2"></i>
                  <p class="support">Close menu</p>
                </div>
            </button>
            </li>
            <li class="nav-item">
              <div class="grid grid-cols-4 w-full h-fit justify-center items-center align-middle mx-auto">
                <RouterLink to="/news3" class="col-span-1">
                  <button class="dashboard-icon w-fit mx-auto p-3">
                    <i class="fa-solid fa-chalkboard"></i>
                  </button>
                </RouterLink>
                <RouterLink to="/news" class="col-span-3">
                  <button class="action-button mx-auto text-base p-3">
                    <i class="fa-solid fa-magnifying-glass mr-2"></i>
                    Show On News
                  </button>
                </RouterLink>
              </div>
            </li>            
          </ul>
        </nav>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import '@styles/HeaderStyle.css';

export default {
  components: { RouterLink },
  setup() {
    const menuOpen = ref(false);
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value; 
    };
    return {
      menuOpen,
      toggleMenu,
    };
  },
};
</script>
<style>
.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  z-index: 50;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);
}

.menu-container.translate-x-0 {
  transform: translateX(0);
  /* Nyitott állapot */
}

.menu-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
}

.mobile-nav {
  width: 16rem;
  max-width: 100%;
  height: 100%;
  background: #1e293b;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  z-index: 51;

}

.close-btn {
  color: white;
}
</style>