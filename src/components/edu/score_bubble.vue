<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { gsap } from 'gsap'
  const props = defineProps(['size', 'score', 'max_score'])
  const baseline = 16 / 3
  const coupon_ref = ref(null)
  const trans = ref({ x: 0, y: 0 })
  const diag_trans = ref({ x: 0, y: 0 })

  const coupon_opacity = ref(0)

  const init_coupon = (el) => {
    coupon_ref.value = el ? el : null
  }
  const onLeave = (el, done) => {
    gsap.to(el, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        coupon_opacity.value = 1
        done()
      },
    })
  }
  onMounted(() => {
    if (coupon_ref.value) {
      const coupon_bbox = coupon_ref.value.getBBox()
      const pathX = coupon_bbox.width / 2 + coupon_bbox.x
      const pathY = coupon_bbox.height / 2 + coupon_bbox.y
      trans.value.x = props.size - pathX
      trans.value.y = props.size - pathY
    }
    diag_trans.value.x = props.size - 91.68
    diag_trans.value.y = props.size - 100
  })
</script>

<template>
  <svg :width="+size * 2" :height="+size * 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle :cx="size" :cy="size" :r="size" fill="url(#paint0_radial_3138_4360)" />
    <defs>
      <radialGradient
        id="paint0_radial_3138_4360"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        :gradientTransform="`translate(${size} ${size}) rotate(90) scale(${size})`"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.8" stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="white" stop-opacity="0.4" />
      </radialGradient>
    </defs>
    <Transition>
      <g v-if="score == 210">
        <text
          class="title"
          :x="+size"
          :y="+size * 0.8 + baseline"
          fill="white"
          text-anchor="middle"
          font-size="2.5rem"
        >
          守護者挑戰
        </text>
        <g class="sub_title">
          <text
            :x="+size"
            :y="+size * 1.1 + baseline"
            fill="white"
            text-anchor="middle"
          >
            測試你的海洋知識
          </text>
          <text
            :x="+size"
            :y="+size * 1.3 + baseline"
            fill="white"
            text-anchor="middle"
          >
            成為解救海洋的一份子
          </text>
        </g>
      </g>
    </Transition>

    <Transition @leave="onLeave">
      <g v-if="score < 210  && score >= 0">
        <text v-if="score < 100"
          :x="+size * 0.65"
          :y="+size * 0.9 + baseline"
          fill="white"
          text-anchor="middle"
          font-size="2.5rem"
        >
          {{ score }}
        </text>
        <text v-else
          :x="+size * 0.6"
          :y="+size * 0.9 + baseline"
          fill="white"
          text-anchor="middle"
          font-size="2.1rem"
        >
          {{ score }}
        </text>
        <line
          x1="75.36"
          y1="125"
          x2="108"
          y2="75"
          stroke="white"
          stroke-width="2"
          :transform="`translate(${diag_trans.x} ${diag_trans.y})`"
        ></line>
        <text v-if="max_score >= 100"
          :x="+size * 1.35"
          :y="+size * 1.3 + baseline"
          fill="white"
          text-anchor="middle"
          font-size="1.5rem"
        >
          {{ max_score }}
        </text>
        <text v-else
          :x="+size * 1.27"
          :y="+size * 1.3 + baseline"
          fill="white"
          text-anchor="middle"
          font-size="1.5rem"
        >
          {{ max_score }}
        </text>
      </g>
    </Transition>

    <Transition>
      <path
        :ref="(el) => init_coupon(el)"
        :x="size"
        :y="+size + baseline"
        d="M17.043 0.578125V9.32812M17.043 12.8281V25.0781M17.043 28.5781V35.5781M1.29297 33.8281H46.793V25.0781C45.043 24.4936 41.543 22.2781 41.543 18.0781C41.543 12.8281 46.793 12.8281 46.793 11.0781V2.32812H1.29297V11.0781C3.04297 11.6626 6.54297 13.8781 6.54297 18.0781C6.54297 23.3281 1.29297 23.3281 1.29297 25.0781V33.8281Z"
        stroke="white"
        stroke-width="2"
        stroke-linejoin="round"
        fill="none"
        class="coupon_path"
        :opacity="coupon_opacity"
      />
    </Transition>
  </svg>
</template>

<style lang="scss" scoped>
  text {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  }
  .title {
    font-family: v.$font-serif-tc;
    font-size: v.$h1-desktop;
    font-weight: v.$font-bold;
    letter-spacing: v.$letter-spacing-wide;
    line-height: v.$line-height-normal;

    @include respond(md) {
      font-size: v.$h1-mobile;
    }
  }
  .sub_title {
    text {
      font-family: v.$font-sans;
      font-size: v.$p-desktop;
      letter-spacing: v.$letter-spacing-base;

      @include respond(md) {
        font-size: v.$p-mobile;
      }
    }
  }
  .coupon_path {
    --translate-x: v-bind('trans.x + "px"');
    --translate-y: v-bind('trans.y + "px"');
    transform: translate(var(--translate-x), var(--translate-y));
    transition: opacity 0.5s ease;
  }
</style>
