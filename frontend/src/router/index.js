import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "@pages/index.vue";
import MarketSearching from "@pages/calculators/MarketSearching.vue";
import AdminLoginPanel from "@pages/calculators/adminloginpanel.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: IndexPage,
  },
  {
    path: "/adminpanel",
    name: "Admin Login Panel",
    component: AdminLoginPanel,
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
