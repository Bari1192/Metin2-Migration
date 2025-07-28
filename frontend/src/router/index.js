import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "@pages/index.vue";
import MarketSearching from "@pages/calculators/MarketSearching.vue";
import AdminLoginPanel from "@pages/login/adminloginpanel.vue";
import AdminControlPanel from "@pages/login/AdminControlPanel.vue";

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
    path: "/admin-control-panel",
    name: "Admin Control Panel",
    component: AdminControlPanel,
  },
  {
    path: "/marketsearch",
    name: "Market Searching",
    component: MarketSearching,
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
