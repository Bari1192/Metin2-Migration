import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "@pages/index.vue";
import MovingCalculator from "@pages/calculators/movingcalculator.vue";
import MarketSearching from "@pages/calculators/MarketSearching.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: IndexPage, 
  },
  {
    path: "/movingcalculator",
    name: "Moving Calculator",
    component: MovingCalculator, 
  },
  {
    path: "/marketsearch",
    name: "Market Searching",
    component: MarketSearching, 
  },
];
export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});
