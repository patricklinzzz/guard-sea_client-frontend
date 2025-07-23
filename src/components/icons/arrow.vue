<script setup>
//default right arrow, set direction="left" to translate to left arrow

defineProps(['direction'])
</script>

<template>
  <svg :class="{left: direction == 'left'}"
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="27"
    viewBox="0 0 15 27"
    fill="none"
  >
    <path
      d="M1.71289 25.1419L13.3796 13.4753L1.71289 1.80859"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style lang="scss" scoped>
svg{
  cursor: pointer;
}
.left{
  transform: scaleX(-1);
}
</style>
