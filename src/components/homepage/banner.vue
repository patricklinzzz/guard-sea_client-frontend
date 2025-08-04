<script setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/SplitText'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(SplitText)
  gsap.registerPlugin(ScrollTrigger)

  import Loading from '@/components/common/loading.vue'
  import bannerV from '@/assets/images/homepage/banner.mp4'
  import bg1 from '@/assets/images/homepage/bg1.png'
  import gwawa from '@/assets/images/homepage/gwawa.png'
  import Button from '@/components/buttons/button.vue'

  let splitTextInstance = null
  const gwawaEl = ref(null)
  let gwawaTimeline = null
  let scrollTriggers = []
  const isHiVisible = ref(false)
  const toggleHi = () => {
    isHiVisible.value = !isHiVisible.value
  }

  const loadingFinish = () => {
    document.fonts.ready.then(() => {
      const title = document.querySelector('h1')
      const banner = document.getElementById('banner')
      if (!title || !banner) return

      splitTextInstance = new SplitText(title, { type: 'chars' })
      const chars = splitTextInstance.chars

      const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: 'power2.out',
        },
      })
      tl.from(chars, { y: 50, opacity: 0, stagger: 0.1 })

      const st = gsap.to(title, {
        scrollTrigger: {
          trigger: banner,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        scale: 3,
        opacity: 0,
        x: 150,
        y: 200,
      })
      scrollTriggers.push(st.scrollTrigger)
      ScrollTrigger.refresh()
    })
  }

  onMounted(() => {
    gwawaTimeline = gsap
      .timeline({
        paused: true,
        defaults: {
          duration: 1,
          ease: 'sine.out',
        },
      })
      .to(gwawaEl.value, { x: -25, y: 0, rotation: -60 })
  })

  onUnmounted(() => {
    if (splitTextInstance) {
      splitTextInstance.revert()
    }
    if (gwawaTimeline) {
      gwawaTimeline.kill()
    }
    scrollTriggers.forEach((st) => st.kill())
    scrollTriggers = []
  })
  const gwawaME = () => {
    gwawaTimeline.play()
  }
  const gwawaML = () => {
    gwawaTimeline.reverse()
    isHiVisible.value = false
  }
</script>

<template>
  <Loading @loaded="loadingFinish">
    <section id="banner">
      <div id="gwawa" @mouseenter="gwawaME" @mouseleave="gwawaML" @click="toggleHi" ref="gwawaEl">
        <img :src="gwawa" alt="" />
        <p id="hi" v-show="isHiVisible">👋Hi</p>
      </div>
      <div id="video_container">
        <video :src="bannerV" autoplay muted loop height="100%"></video>
      </div>
      <article>
        <h1>守護海洋,從了解開始</h1>
        <div id="buttons">
          <Button variant="transparent" @click="router.push('/edu/species')">了解更多</Button>
          <Button @click="router.push('/event')">我想參與</Button>
        </div>
      </article>
      <img :src="bg1" alt="" class="bg" />
    </section>
  </Loading>
</template>

<style scoped lang="scss">
  #banner {
    position: relative;
    background-color: v.$color-blue-extra-dark;
    #video_container {
      width: 100%;
      height: 500px;
      position: relative;
      overflow: hidden;
      video {
        position: absolute;
        top: -90px;
        width: 100%;
        height: 680px;
        object-fit: cover;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20%;
        background: linear-gradient(to top, rgba(#001526, 0.8) 0%, transparent 100%);
      }
    }
    .bg {
      width: 100%;
      vertical-align: middle;
    }
    #gwawa {
      will-change: transform;
      position: absolute;
      top: 0;
      right: -85px;
      rotate: 15deg;
      z-index: 2;
      cursor: pointer;
      @include respond(md) {
        display: none;
      }
      img {
        width: 150px;
      }
      #hi {
        position: absolute;
        top: 0;
      }
    }

    article {
      position: absolute;
      top: 25%;
      left: 15%;
      @include respond(md) {
        left: 50%;
        transform: translateX(-50%);
      }
      h1 {
        text-shadow: 0 4px 4px #000000ce;
        text-wrap: balance;
      }
      #buttons {
        margin: 28px 15px 0 0;
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        @include respond(md) {
          justify-content: space-evenly;
          margin-right: 0;
        }
        .button--transparent {
          color: v.$color-orange;
        }
      }
    }
  }
</style>
