<script setup>
  import { ref } from 'vue'

  const props = defineProps(['text'])
  const emit = defineEmits(['click'])

  const bubbles = ref([])

  function popBubbles(event) {
    for (let i = 0; i < 3; i++) {
      const id = Date.now() + i
      const size = Math.random() * 10 + 8
      const x = Math.random() * 60 - 30
      const y = Math.random() * -40 - 10

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
      }, 1500)
    }
  }

  function handleClick(event) {
    emit('click', event)
  }
</script>

<template>
  <div
    class="bubble-container"
    @mouseover="popBubbles"
    @click="handleClick"
    role="button"
    tabindex="0"
  >
    <div class="circle-link">
      <h2>{{ text }}</h2>
    </div>
    <span v-for="bubble in bubbles" :key="bubble.id" class="bubble" :style="bubble.style"></span>
  </div>
</template>

<style lang="scss" scoped>
  .bubble-container {
    position: relative;
    display: inline-block;
    overflow: visible;
    cursor: pointer;
  }

  .circle-link {
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
    font-size: v.$h2-mobile;
    transition: all 0.6s ease;
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
      transform: translateY(-3px) translateX(3px) scale(1.05);
      animation: none;
    }
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
</style>
