<script setup></script>

<template>
  <svg class="arrows">
    <path class="a1" d="M0 0 L30 32 L60 0"></path>
    <path class="a2" d="M0 20 L30 52 L60 20"></path>
    <path class="a3" d="M0 40 L30 72 L60 40"></path>
  </svg>
</template>

<style lang="scss" scoped>
  .arrows {
    width: 60px;
    height: 72px;
    position: absolute;
    left: 50%;
    margin-left: -30px;
    bottom: 20px;
  }

  .arrows path {
    stroke: white;
    fill: transparent;
    stroke-width: 3px;
    animation: arrow 2s infinite;
    -webkit-animation: arrow 2s infinite;
  }

  @keyframes arrow {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes arrow /*Safari and Chrome*/ {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  .arrows path.a1 {
    animation-delay: -0.6s;
    -webkit-animation-delay: -0.6s; /* Safari 和 Chrome */
  }

  .arrows path.a2 {
    animation-delay: -0.3s;
    -webkit-animation-delay: -0.3s; /* Safari 和 Chrome */
  }

  .arrows path.a3 {
    animation-delay: 0s;
    -webkit-animation-delay: 0s; /* Safari 和 Chrome */
  }
</style>
