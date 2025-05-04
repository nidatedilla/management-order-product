<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo">
        <LucideHome class="icon" />
        MyStore
      </router-link>
      <ul class="navbar-links">
        <li>
          <router-link to="/products" class="nav-link"
            ><LucideBox class="icon" /> Produk</router-link
          >
        </li>
        <li>
          <router-link to="/orders" class="nav-link"
            ><LucideList class="icon" /> Pesanan</router-link
          >
        </li>
      </ul>
      <div class="navbar-toggle" @click="toggleMenu">
        <LucideMenu class="icon" />
      </div>
    </div>

    <transition name="fade">
      <div v-if="isMenuOpen" class="navbar-mobile-links">
        <ul>
          <li>
            <router-link to="/products" @click="closeMenu" class="nav-link"
              ><LucideBox class="icon" /> Produk</router-link
            >
          </li>
          <li>
            <router-link to="/orders" @click="closeMenu" class="nav-link"
              ><LucideList class="icon" /> Pesanan</router-link
            >
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import {
  Home as LucideHome,
  Menu as LucideMenu,
  Box as LucideBox,
  List as LucideList,
  PlusCircle as LucidePlusCircle,
} from "lucide-vue-next";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
.navbar {
  background-color: #393e46;
  border-bottom: 1px solid #808899;
  color: #eeeeee;
  padding: 15px 0;
  font-family: "Segoe UI", sans-serif;
  position: relative;
  z-index: 10;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.navbar-logo {
  font-size: 22px;
  font-weight: bold;
  color: #00adb5;
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 8px;
}

.navbar-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-links li {
  margin-left: 24px;
}

.navbar-links li a {
  color: #eeeeee;
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
}

.navbar-links li a:hover {
  color: #00adb5;
}

.icon {
  width: 18px;
  height: 18px;
  color: inherit;
}

.navbar-toggle {
  display: none;
  cursor: pointer;
  color: #eeeeee;
}

.navbar-mobile-links {
  background-color: #393e46;
  width: 20%;
  right: 0;
  padding: 12px 24px;
  box-shadow: inset 0 -1px 0 #222831;
  position: absolute;
  margin-top: 15px;
}

.navbar-mobile-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar-mobile-links ul li {
  padding: 10px 0;
}

.navbar-mobile-links ul li a {
  color: #eeeeee;
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;
}

.navbar-mobile-links ul li a:hover {
  color: #00adb5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.navbar-links li .router-link-exact-active,
.navbar-mobile-links ul li .router-link-exact-active {
  color: #00adb5;
  font-weight: bold;
  border-bottom: 2px solid #00adb5;
  padding-bottom: 8px;
}

@media (max-width: 768px) {
  .navbar-links {
    display: none;
  }
  .navbar-toggle {
    display: block;
  }
  .navbar-mobile-links {
    width: 35%;
  }
}

@media (max-width: 320px) {
  .navbar-mobile-links {
    width: 50%;
  }
}
</style>
