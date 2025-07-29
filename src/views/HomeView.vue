<script setup>
  //組件
  import Banner from '@/components/homepage/banner.vue'
  import About_us from '@/components/homepage/about_us.vue'
  import Action from '@/components/homepage/action.vue'
  import Map from '@/components/homepage/map.vue'
  import Pollute from '@/components/homepage/pollute.vue'
  import Coral_reff from '@/components/homepage/coral_reef.vue'
  import Future_action from '@/components/homepage/future_action.vue'
  import Story from '@/components/homepage/story.vue'
  import Store from '@/components/homepage/store.vue'
</script>

<template>
  <main>
    <Banner></Banner>
    <About_us></About_us>
    <Action></Action>
    <Map></Map>
    <Pollute></Pollute>
    <Coral_reff></Coral_reff>
    <Future_action></Future_action>
    <Story></Story>
    <Store></Store>
  </main>
</template>

<style scoped lang="scss">
  main {
    overflow: hidden;
    &::before {
      @include bg-layer-fixed-dark;
    }
    color: v.$color-white;
  }
</style>
