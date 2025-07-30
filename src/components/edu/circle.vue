<script setup>
  defineProps(['text', 'r'])
  const emit = defineEmits(['click'])
  const handleClick = (event) => {
    emit('click', event)
  }
</script>

<template>
  <div class="circle" @click="handleClick">
    <p>{{ text }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .circle {
    --r: v-bind('r + "px"');
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    // width: 150px;
    width: var(--r);
    height: var(--r);
    border: 1.5px solid v.$color-white;
    border-radius: 50%;
    text-decoration: none;
    color: v.$color-text-white;
    // font-size: 1.125rem;
    transition: all 0.3s ease;
    animation: floatCircle 4s ease-in-out infinite;
    cursor: pointer;

    p {
      width: fit-content;
      --fz: v-bind('+r * 0.0088235294 + "rem"');
      font-size: var(--fz);
      margin-right: -5px;
      letter-spacing: v.$letter-spacing-wide;
    }

    @media (min-width: 768px) {
      --rB: v-bind('+r + 20 + "px"');
      // width: 170px;
      width: var(--rB);
      height: var(--rB);
      p {
        --fzB: v-bind('(+r + 20) * 0.0088235294 + "rem"');
        font-size: var(--fzB);
      }
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
</style>
