<script setup>
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
</script>

<template>
  <nav>
    <RouterLink to="/" class="nav-item">
      <Icon icon="mdi:home-outline" />
      <span>Home</span>
    </RouterLink>

    <RouterLink to="/cart" class="nav-item">
      <Icon icon="mdi:cart-outline" />
      <span>Cart</span>
    </RouterLink>

    <RouterLink to="/checkout" class="nav-item">
      <Icon icon="mdi:credit-card-outline" />
      <span>Checkout</span>
    </RouterLink>

    <RouterLink to="/settings" class="nav-item">
      <Icon icon="mdi:cog-outline" />
      <span>Settings</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--nav-border);
  background-color: var(--nav-bg);
}

.nav-item {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  text-decoration: none;
  color: var(--text-secondary);
}

.nav-item :deep(svg) {
  font-size: 1.25rem;
}

.nav-item span {
  margin-top: 4px;
}

.router-link-active {
  color: var(--accent);
}
</style>
