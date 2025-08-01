<script setup>
  import BubbleCircle from '@/components/edu/BubbleCircle.vue'
  import LightRays from '@/components/edu/LightRays.vue'
  // const direction = ref(1)
  // const fish = ref(null)

  // onMounted(() => {
  //   fish.value.addEventListener('animationiteration', () => {
  //     direction.value *= -1
  //   })
  // })
</script>

<template>
  <LightRays />

  <div class="wrapper">
    <nav>
      <BubbleCircle text="生物圖鑑" link="/edu/species" />
      <BubbleCircle text="滅絕原因" link="/edu/causes" />
      <BubbleCircle text="知識測驗" link="/edu/quiz" />
    </nav>
    <div class="fish-container">
      <svg
        class="fish"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 32"
        width="80"
        height="30"
        fill="#3F8EAF"
      >
        <!-- 魚身體 -->
        <path d="M2 16c8-12 20-12 32 0-12 12-24 12-32 0z" />
        <!-- 魚尾巴 -->
        <path d="M34 16l10-6v12l-10-6z" />
      </svg>
      <svg
        class="fish2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 32"
        width="70"
        height="25"
        fill="#3F8EAF"
      >
        <!-- 魚身體 -->
        <path d="M2 16c8-12 20-12 32 0-12 12-24 12-32 0z" />
        <!-- 魚尾巴 -->
        <path d="M34 16l10-6v12l-10-6z" />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .wrapper::before {
    @include bg-layer-fixed-dark;
  }
  nav {
    display: grid;
    justify-content: center;
    gap: 20px;
    margin-top: 50px;
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
    font-size: v.$h2-mobile;
    transition: all 0.3s ease;
    animation: floatCircle 4s ease-in-out infinite;

    @media (min-width: 768px) {
      width: 170px;
      height: 170px;
      font-size: v.$h2-desktop;
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

  .fish-container {
    position: fixed;
    top: 10%;
    left: -100px;
    animation: swim-desktop 10s linear infinite alternate;
    z-index: 1;
    transform: scaleX(1);

    @media (min-width: 768px) {
      top: 30%;
      animation: swim-desktop 20s linear infinite alternate;
    }
  }

  .fish,
  .fish2 {
    animation: fishFlip 20s linear infinite;
    @media (min-width: 768px) {
      animation: fishFlip 40s linear infinite;
    }
  }

  .fish2 {
    animation: fishFlip 20s linear infinite;
    // animation-fill-mode: both;
    @media (min-width: 768px) {
      animation: fishFlip 40s linear infinite;
    }
  }

  @keyframes swim-mobile {
    0% {
      transform: translate(110vw, 20px) rotate(2deg);
      opacity: 0;
    }
    10% {
      transform: translate(100vw, 40px) rotate(-5deg);
      opacity: 1;
    }
    25% {
      transform: translate(90vw, 60px) rotate(4deg);
    }
    50% {
      transform: translate(60vw, 120px) rotate(-4deg);
    }
    75% {
      transform: translate(30vw, 220px) rotate(4deg);
    }
    100% {
      transform: translate(-10vw, 300px) rotate(-4deg);
      opacity: 0.5;
    }
  }

  @keyframes swim-desktop {
    0% {
      transform: translate(110vw, 20px) rotate(5deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    25% {
      transform: translate(90vw, 50px) rotate(-5deg);
    }
    50% {
      transform: translate(60vw, 80px) rotate(5deg);
    }
    75% {
      transform: translate(30vw, 110px) rotate(-5deg);
    }
    100% {
      transform: translate(-10vw, 150px) rotate(5deg);
      opacity: 0.5;
    }
  }

  @keyframes fishFlip {
    0%,
    50% {
      transform: scaleX(1);
    }
    50.01%,
    100% {
      transform: scaleX(-1);
    }
  }
</style>
