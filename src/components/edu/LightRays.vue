<script setup>
  // 此元件無 props，如需控制可加傳入光線數量、動畫開關等功能
</script>

<template>
  <div class="light-rays">
    <div class="light-ray ray1"></div>
    <div class="light-ray ray2"></div>
    <div class="light-ray ray3"></div>
  </div>
</template>

<style scoped lang="scss">
  .light-rays {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90vh;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .light-ray {
    position: fixed;
    top: -10vh;
    width: 100vw;
    height: 120vh;
    background: linear-gradient(to bottom, rgba(180, 200, 255, 0.45), transparent 70%);
    filter: blur(3px);
    opacity: 0.35;
    pointer-events: none;
    transform-origin: top center;
    animation: floatY 4.5s ease-in-out infinite;
    mix-blend-mode: screen;
    overflow: hidden;
    z-index: -1;
  }

  .ray1 {
    left: 50%;
    // animation-delay: 0s;
    opacity: 0.25;
  }

  .ray2 {
    left: 60%;
    // animation-delay: 0s;
    opacity: 0.3;
  }

  .ray3 {
    left: 70%;
    // animation-delay: 0s;
    opacity: 0.3;
  }

  @keyframes floatY {
    0%,
    100% {
      transform: rotate(25deg) scaleY(1.2) translateY(0);
      opacity: 0.2;
    }
    50% {
      transform: rotate(25deg) scaleY(1.25) translateY(10px);
      opacity: 0.45;
    }
  }
</style>
