<script setup>
  import FloatBubble from '@/components/edu/circle.vue'
  import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <nav>
      <router-link to="/edu/species" custom v-slot="{ navigate }">
        <FloatBubble text="生物圖鑑" r="150" @click="navigate"></FloatBubble>
      </router-link>
      <router-link to="/edu/causes" custom v-slot="{ navigate }">
        <FloatBubble text="滅絕原因" r="150" @click="navigate"></FloatBubble>
      </router-link>
      <router-link to="/edu/quiz" custom v-slot="{ navigate }">
        <FloatBubble text="知識測驗" r="150" @click="navigate"></FloatBubble>
      </router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper::before {
    @include bg-layer-fixed-dark;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  nav {
    display: grid;
    justify-content: center;
    gap: 20px;
    margin-top: 60px;
    margin-bottom: 30px;
    grid-template-columns: repeat(1, 150px);

    @media (min-width: 600px) {
      grid-template-columns: repeat(3, 150px);
      gap: 40px;
    }
    @media (min-width: 768px) {
      gap: 60px;
    }
  }

  @keyframes floatCircle {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  nav div:nth-child(1) {
    animation-delay: 0s;
  }
  nav div:nth-child(2) {
    animation-delay: 0.3s;
  }
  nav div:nth-child(3) {
    animation-delay: 0.6s;
  }
</style>
