<script setup>
  import { ref, onMounted, onUnmounted, defineOptions } from 'vue'
  import gsap from 'gsap'
  defineOptions({
    inheritAttrs: false,
  })
  const props = defineProps(['text', 'r'])
  const emit = defineEmits(['click'])

  const containerEl = ref(null)
  const bubbles = ref([])
  let intervalId = null
  let containerTimeline = null

  onMounted(() => {
    if (containerEl.value) {
      containerTimeline = gsap.timeline({ repeat: -1, yoyo: true })
      containerTimeline.to(containerEl.value, { y: -15, duration: 2, ease: 'power1.inOut' })
    }
  })

  onUnmounted(() => {
    if (containerTimeline) {
      containerTimeline.kill()
    }
    if (intervalId !== null) {
      clearInterval(intervalId)
    }
  })

  const handleMouseEnter = () => {
    if (containerTimeline) {
      containerTimeline.pause()
    }
    gsap.to(containerEl.value, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    })
    popBubbles()
  }

  const handleMouseLeave = () => {
    if (containerTimeline) {
      containerTimeline.resume()
    }
    gsap.to(containerEl.value, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }
  function popBubbles(event) {
    if (intervalId === null) {
      intervalId = setInterval(() => {
        const containerY = gsap.getProperty(containerEl.value, 'y')

        for (let i = 0; i < 3; i++) {
          const id = Date.now() + i
          const size = Math.random() * 10 + 8
          const x = Math.random() * (props.r * 0.4) - props.r * 0.2
          const y = Math.random() * (props.r * -0.2666666667) - props.r * 0.0666666667

          bubbles.value.push({
            id,
            size,
            x: x,
            y: y,
            containerY,
          })

          setTimeout(() => {
            bubbles.value = bubbles.value.filter((b) => b.id !== id)
          }, 1500)
        }
      }, 100)
    }
  }

  function handleClick(event) {
    emit('click', event)
  }

  const onEnter = (el, done) => {
    const bubbleData = bubbles.value.find((b) => b.id === parseInt(el.__vnode.key))
    if (bubbleData) {
      gsap.fromTo(
        el,
        {
          x: bubbleData.x,
          y: bubbleData.y + bubbleData.containerY,
          opacity: 1,
          scale: 1,
        },
        {
          x: `+=${bubbleData.x / 1.5}`,
          y: `+=${bubbleData.y / 1.5}`,
          opacity: 0,
          scale: 1.8,
          duration: 1.5,
          ease: 'power1.out',
        }
      )
    }
    done()
  }
</script>

<template>
  <div class="bubble-container" @click="handleClick" role="button" tabindex="0">
    <div
      ref="containerEl"
      v-bind="$attrs"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      class="circle-link"
    >
      <h2 :class="{ small: r <= 100 }">{{ text }}</h2>
    </div>
    <TransitionGroup @enter="onEnter">
      <span
        v-for="bubble in bubbles"
        :key="bubble.id"
        class="bubble"
        :style="{
          width: bubble.size + 'px',
          height: bubble.size + 'px',
        }"
      ></span>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
  .bubble-container {
    position: relative;
    display: inline-block;
    overflow: visible;
  }

  .circle-link {
    --r: v-bind('r + "px"');
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    // width: 150px;
    // height: 150px;
    width: var(--r);
    height: var(--r);
    border: 1.5px solid v.$color-white;
    border-radius: 50%;
    text-decoration: none;
    color: v.$color-text-white;

    h2 {
      --fz: v-bind('+r * 0.0083333333 + "rem"');
      font-size: var(--fz);
      margin-right: -5px;
    }
    .small {
      font-family: v.$font-sans;
      font-weight: normal;
    }
    cursor: pointer;
    // animation: floatCircle 4s ease-in-out infinite;

    @media (min-width: 768px) {
      --rB: v-bind('+r + 20 + "px"');
      width: var(--rB);
      height: var(--rB);
      h2 {
        --fzB: v-bind('(+r + 20) * 0.0117647059 + "rem"');
        font-size: var(--fzB);
      }
      .small{
        font-size: 1rem;
      }
      // width: 170px;
      // height: 170px;
      // font-size: v.$h2-desktop;
    }

    &:hover {
      background-color: v.$color-blue-navy;
      color: v.$color-text-white;
      border: 3px solid v.$color-skyblue;
    }
  }

  .bubble {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    pointer-events: none;

    // animation: bubbleFade 1.5s ease-out forwards;
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

  .selected {
    background-color: v.$color-blue-navy;
    color: v.$color-text-white;
    border: 3px solid v.$color-skyblue;
    transform: scale(1.05);
  }
</style>
