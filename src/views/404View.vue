<script setup>
  const diverImage = new URL('@/assets/images/member-system/diver.png', import.meta.url).href
</script>

<template>
  <main class="wrapper">
    <div class="circle-container">
      <div class="circle-text">
        <h1>404</h1>
        <h2>找不到頁面</h2>
      </div>
      <div class="first-circles">
        <span></span>
      </div>

      <img :src="diverImage" alt="Diver" class="diver-img" />

      <div class="second-circles">
        <span></span>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .wrapper::before {
    @include bg-layer-fixed-dark;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: auto;
    background-color: v.$color-blue-dark;
    position: relative;
    padding: 60px 40px 0px 0px;
  }

  .circle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .circle-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 2px solid v.$color-white;
    color: v.$color-white;
    font-size: 1.2rem;
    text-align: center;

    @media (min-width: 768px) {
      width: 250px;
      height: 250px;
      font-size: 1.5rem;
    }
  }

  .diver-img {
    width: 200px;
    margin-top: -58px;
    animation: floatImage 4s ease-in-out infinite;

    @media (min-width: 768px) {
      width: 250px;
      margin-top: -70px;
    }
  }

  .first-circles {
    position: absolute;
    top: 50%;
    right: -20px;
    display: flex;
    flex-direction: column;
    span {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: solid 1.5px v.$color-white;
      animation: floatCircle 3s ease-in-out infinite;
    }
  }
  .second-circles {
    position: absolute;
    top: 0%;
    right: 200px;
    display: flex;
    flex-direction: column;

    span {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: solid 1.5px v.$color-white;
      animation: floatCircle 3s ease-in-out infinite;
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

  @keyframes floatImage {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-8px) rotate(2deg);
    }
  }
</style>
