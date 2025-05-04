<template>
  <div id="app" class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.app-container {
  background-color: #222831;
  color: #eeeeee;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
  display: flex;
  flex-direction: column;
}
</style>
