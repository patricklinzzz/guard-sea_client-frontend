<script setup>
  defineProps(['text', 'link'])
</script>

<template>
  <router-link :to="link" class="circle-link">
    <h2>{{ text }}</h2>
  </router-link>
</template>

<style lang="scss" scoped>
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    width: 150px;
    height: 150px;
    border: 1.5px solid v.$color-white;
    border-radius: 50%;
    text-decoration: none;
    color: v.$color-text-white;
    font-size: 1.125rem;
    transition: all 0.3s ease;
    animation: floatCircle 4s ease-in-out infinite;

    @media (min-width: 768px) {
      width: 170px;
      height: 170px;
      font-size: 1.5rem;
    }

    &:hover {
      background-color: v.$color-blue-navy;
      color: v.$color-text-white;
      border: 3px solid v.$color-skyblue;
      transform: scale(1.05);
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

  // nav a:nth-child(1) {
  //   animation-delay: 0s;
  // }
  // nav a:nth-child(2) {
  //   animation-delay: 0.3s;
  // }
  // nav a:nth-child(3) {
  //   animation-delay: 0.6s;
  // }

  .text {
    color: v.$color-white;
    text-align: center;
    margin-bottom: 16px;
  }
</style>
