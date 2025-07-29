<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  import banner from '@/assets/images/homepage/banner.png'
  import bg1 from '@/assets/images/homepage/bg1.png'
  import Button from '@/components/buttons/button.vue'
</script>
<template>
  <section id="banner">
    <img :src="banner" alt="" />
    <article>
      <h1>守護海洋,從了解開始</h1>
      <div id="buttons">
        <Button variant="transparent" @click="router.push('/edu/species')">了解更多</Button>
        <Button @click="router.push('/event')">我想參與</Button>
      </div>
    </article>
    <img :src="bg1" alt="" />
  </section>
</template>
<style scoped lang="scss">
  #banner {
    position: relative;
    background-color: v.$color-blue-extra-dark;
    img {
      width: 100%;
      vertical-align: middle;
    }
    article {
      position: absolute;
      top: 25%;
      left: 15%;
      @include respond(md){
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
        @include respond(md){
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
