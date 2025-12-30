<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="bottom-nav">
    <RouterLink to="/" class="nav-item">
      <i class="bi bi-house"></i>
      <span>Home</span>
    </RouterLink>

    <RouterLink to="/cart" class="nav-item">
      <i class="bi bi-cart"></i>
      <span>Cart</span>
    </RouterLink>

    <RouterLink to="/history" class="nav-item">
      <i class="bi bi-clock-history"></i>
      <span>History</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  background: #fff;
}

.nav-item {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 12px;
  text-decoration: none;
  color: #555;
}

.nav-item i {
  font-size: 20px;
}

.nav-item span {
  margin-top: 4px;
}

.router-link-active {
  color: #0d6efd;
}
</style>
