import { createRouter, createWebHistory } from "vue-router";

import ProductsPage from "./pages/ProductsPage.vue";
import OrdersPage from "./pages/OrdersPage.vue";
import AddOrderPage from "./pages/AddOrderPage.vue";

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
  {
    path: "/orders",
    name: "Pesanan",
    component: OrdersPage,
  },
  {
    path: "/add-order",
    name: "TambahPesanan",
    component: AddOrderPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
