<script setup>
  import { ref, onMounted } from 'vue'

  const bubbles = ref([])

  function createBubble() {
    const id = Date.now() + Math.random()
    const size = Math.random() * 10 + 8
    const x = Math.random() * 100 - 50
    const y = Math.random() * -50 - 20

    bubbles.value.push({
      id,
      style: `
      width: ${size}px;
      height: ${size}px;
      transform: translate(${x}px, ${y}px);
    `,
    })

    setTimeout(() => {
      bubbles.value = bubbles.value.filter((b) => b.id !== id)
    }, 2000)
  }

  onMounted(() => {
    setInterval(() => {
      createBubble()
    }, 500)
  })
</script>

<template>
  <div class="bubble-container">
    <span v-for="bubble in bubbles" :key="bubble.id" class="bubble" :style="bubble.style"></span>
  </div>
</template>

<style lang="scss" scoped>
  .bubble-container {
    position: relative;
    display: inline-block;
    overflow: visible;
  }

  .bubble {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    pointer-events: none;
    animation: bubbleFade 1.5s ease-out forwards;
  }

  @keyframes bubbleFade {
    0% {
      opacity: 1;
      scale: 1;
    }
    100% {
      opacity: 0;
      scale: 1.8;
    }
  }

  @keyframes floatCircle {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }

  // nav a:nth-child(2) {
  //   animation-delay: 2s;
  // }
</style>
