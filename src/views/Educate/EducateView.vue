<script setup></script>

<template>
  <h3 class="text">暫時的導覽列，之後header的dropdown設計完後這頁可以刪掉</h3>
  <div class="wrapper">
    <nav>
      <router-link to="/edu/species"><h2>生物圖鑑</h2></router-link>
      <router-link to="/edu/causes"><h2>滅絕原因</h2></router-link>
      <router-link to="/edu/quiz"><h2>知識測驗</h2></router-link>
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

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    aspect-ratio: 1 / 1;
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

  nav a:nth-child(1) {
    animation-delay: 0s;
  }
  nav a:nth-child(2) {
    animation-delay: 0.3s;
  }
  nav a:nth-child(3) {
    animation-delay: 0.6s;
  }

  .text {
    color: v.$color-white;
    text-align: center;
    margin-bottom: 16px;
  }
</style>
