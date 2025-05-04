import { createRouter, createWebHistory } from "vue-router";

import ProductsPage from "./pages/ProductsPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/products",
  },
  {
    path: "/products",
    name: "Produk",
    component: ProductsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
