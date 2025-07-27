<template>
  <BaseHeader />
  <div class="main bg-slate-950">
    <div class="w-full mx-auto text-white">
      <div id="welcome" class="w-full flex mx-auto justify-center text-white">

        <div class="mx-4 welcome-text-first pt-8 lg:pt-10 w-fit flex flex-col  items-center relative">
          <!-- Első sor -->
          <div class="text-container relative">
            <p class="Outsmart text-white">
              Outsmart the Market
            </p>
            <div class=" glow-line"></div>
          </div>

          <!-- Második sor -->
          <div class="welcome-text-second lg:mt-4">
            <p class="notyourbudget">
              Not Your Budget
            </p>
          </div>

          <div class="separator mt-[1px] mb-12 lg:mb-16"></div>

          <div class="cta-container relative">
            <div class="animated-arrow">
              <i class="fa-solid fa-arrow-right text-lime-400"></i>
            </div>
            <RouterLink to="/marketsearch" class="flex justify-start">
              <div class="cta-button flex justify-center items-center align-middle font-semibold">
                <span class="material-symbols-outlined mr-2 text-white">
                  content_paste_search
                </span>
                <p>Check Markets</p>
              </div>
            </RouterLink>
            <div class="animated-arrow-right">
              <i class="fa-solid fa-arrow-left text-lime-400"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BaseFooter />
</template>

<script setup>
import BaseHeader from '@components/layout/BaseHeader.vue';
import BaseFooter from '@components/layout/BaseFooter.vue';
</script>

<style>
#welcome {
  min-height: 85dvh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-image: url('../assets/img/main/4000x5000.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-position-x: center;
}


.Outsmart {
  font-family: 'Russo One', sans-serif;
  font-size: 4.5rem;
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  backdrop-filter: blur(5px);
  transform: rotateX(5deg);
  transition: transform 0.3s ease;
  margin-top: 2rem;

}

.notyourbudget {
  font-family: 'Orbitron', sans-serif, Arial, Helvetica, sans-serif;
  font-size: 3rem;
  margin-top: 3rem;
  font-weight: 700;
  background: linear-gradient(45deg, #f63636, #f47676, #f63636);
  color: gainsboro;
  text-shadow: 2px 2px 4px rgba(255, 79, 79, 0.3);
}

.glow-line {
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  animation: glow 2s infinite;
}

.separator {
  width: 20%;
  height: 4px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  border-radius: 2px;
}

.cta-button {
  padding: .7rem 1.5rem;
  font-size: 1.2rem;
  background: linear-gradient(180deg, #720b0b, #d05757, #720b0b);
  border: 2px solid rgba(138, 180, 147, 0.5);
  color: white;
  border-radius: 30px;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  box-shadow: 0 4px 15px rgba(255, 79, 79, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 79, 79, 0.4);
}

.animated-arrow {
  position: absolute;
  right: 107%;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 1.9rem;
  animation: bounceArrowLeft 1.5s infinite;
}

.animated-arrow-right {
  position: absolute;
  left: 107%;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 1.9rem;
  animation: bounceArrowRight 1.5s infinite;
}

@media (min-width: 769px) {
  .notyourbudget {
    font-size: 3.5rem;
  }

  .Outsmart {
    font-size: 3rem;
  }
}

@media (min-width: 1920px) {
  #welcome {
    background-size: cover;
    background-position: center;
    width: 100%;
    min-height: 125dvh;
    background-image: url('../assets/img/main/gray-zone-MainPageBanner.webp');
  }
}

@media (min-width: 1280px) and (max-width: 1920px) {
  #welcome {
    min-height: 125dvh;
    width: auto;
    flex-direction: row;
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
  }

  .Outsmart {
    font-size: 4.5rem;
  }

  .notyourbudget {
    font-size: 3rem;
    padding: 6px 20px;
    border-radius: 1rem;
    box-shadow: rgba(97, 93, 93, 0.32) 1px 3px 50px 10px;
  }

  .separator {
    width: 50%;
  }

  .cta-button {
    padding: .8rem 1.3rem;
    font-size: 1.5rem;
    background: linear-gradient(180deg, #720b0b, #d05757, #720b0b);
    border: 2px solid rgba(138, 180, 147, 0.5);
    color: white;
    border-radius: 20px;
    transition: transform 0.5s ease, box-shadow 0.5s ease;
    box-shadow: 8px 8px 20px rgba(255, 79, 79, 0.2);
  }

  .animated-arrow {
    position: absolute;
    right: 115%;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 2.2rem;
    animation: bounceArrowLeft 1.5s infinite;
  }

  .animated-arrow-right {
    position: absolute;
    left: 115%;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 2.2rem;
    animation: bounceArrowRight 1.5s infinite;
  }

}

@media (min-width: 1024px) and (max-width: 1280px) {
  #welcome {
    min-height: 100dvh;
    width: auto;
    flex-direction: row;
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
  }

  .Outsmart {
    font-size: 4rem;
  }

  .notyourbudget {
    font-size: 2.5rem;
    padding: 6px 20px;
    border-radius: 1rem;
    box-shadow: rgba(97, 93, 93, 0.32) 1px 3px 50px 10px;
  }

  .separator {
    width: 50%;
  }

  .text-container {
    perspective: 1000px;
  }

  .Outsmart:hover {
    transform: rotateX(0deg);
  }

}

@media (min-width: 769px)and (max-width: 1023px) {
  #welcome {
    min-height: 100dvh;
    width: 100%;
    display: flex;
    justify-content: center;
    background-size: cover;
    background-position: bottom;
  }

  .Outsmart {
    font-size: 4rem;
  }

  .notyourbudget {
    font-size: 2.5rem;
    padding: 6px 20px;
    border-radius: 1rem;
    box-shadow: rgba(97, 93, 93, 0.32) 1px 3px 50px 10px;
  }

  .separator {
    width: 50%;
  }
}

@media (max-width: 768px) {
  #welcome {
    min-height:100svh;
    justify-content: center;
    background-size: cover;
    background-position: bottom;
  }

  .Outsmart {
    font-size: 2.5rem;
  }

  .notyourbudget {
    font-size: 2rem;
    padding: 6px 20px;
    border-radius: 1rem;
    box-shadow: rgba(97, 93, 93, 0.32) 1px 3px 50px 10px;
  }

  .separator {
    width: 40%;
  }
}

@keyframes glow {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 1;
  }
}

@keyframes bounceArrowLeft {

  0%,
  100% {
    transform: translateX(0) translateY(-50%);
  }

  50% {
    transform: translateX(10px) translateY(-50%);
  }
}

@keyframes bounceArrowRight {

  0%,
  100% {
    transform: translateX(0) translateY(-50%);
  }

  50% {
    transform: translateX(-10px) translateY(-50%);
  }
}
</style>