<template>
  <div class="loading-bar-container">
    <div class="loading-bar"></div>
  </div>
</template>

<style scoped>
.loading-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  z-index: 9999;
}

.loading-bar {
  width: 100%;
  height: 100%;
  background-color: var(--accent);
  animation: loading-animation 1s infinite linear;
}

@keyframes loading-animation {
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  49% {
    transform: scaleX(1);
    transform-origin: left;
  }
  50% {
    transform: scaleX(1);
    transform-origin: right;
  }
  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}
</style>
