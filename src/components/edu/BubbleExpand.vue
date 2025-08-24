<script setup>
  import { ref, onMounted, defineExpose } from 'vue'
  import { gsap } from 'gsap'

  import Pollution from '@/assets/images/Educate/Causes/ta.jpg'
  import Overfishing from '@/assets/images/Educate/Causes/overfishing_banner.jpeg'
  import Degradation from '@/assets/images/Educate/Causes/degradation_banner.jpeg'

  const props = defineProps(['code', 'title'])

  const pathD = ref('M 210 10 A 200 200 0 1 1 210 410 A 200 200 0 1 1 210 10 Z')

  const img_r = ref(null)
  const img_ref = ref(null)
  img_ref.value = props.code == 0 ? Pollution : props.code == 1 ? Overfishing : Degradation

  const anime = () => {
    if (img_r.value) {
      gsap.to(img_r.value, {
        clipPath: 'circle(100% at 50% 50%)',
        duration: 1.2,
        ease: 'power3.out',
      })
    }
  }
  defineExpose({
    anime,
  })
  onMounted(() => {
    if (img_r.value) {
      gsap.set(img_r.value, { clipPath: 'circle(19% at 50% 37%)' })
    }
    
  })
</script>

<template>
  <div>
    <img ref="img_r" :src="img_ref" alt="" />
  </div>
</template>

<style lang="scss" scoped>
  div {
    width: 100%;
    height: 420px;
    position: relative;
    img {
      width: 100%;
      height: 100vh;
      object-fit: cover;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
