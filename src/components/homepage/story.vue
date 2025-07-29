<template>
  <section id="story">
    <img :src="diver" alt="" id="img_diver" />
    <h2>真實故事或社群感</h2>
    <div id="story_container">
      <storyCard></storyCard>
    </div>
  </section>
</template>

<script setup>
  import diver from '@/assets/images/homepage/diver.png'
  import storyCard from '@/components/cards/story.vue'
</script>

<style lang="scss" scoped>
  #story {
    position: relative;
    padding: 100px 18.75vw 0 18.75vw;
    @include respond(md){
      padding: 100px 5vw 0 5vw;
    }
    #img_diver {
      position: absolute;
      top: -75px;
      height: 150px;
      left: 50%;
      transform: translateX(-50%);
    }
    #story_container {
      padding: 75px 0;
      @include respond(md){
        padding: 60px 0;
      }
    }
  }
</style>
