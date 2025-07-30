<template>
  <section id="map">
    <h2>互動地圖</h2>
    <p>
      <i class="fa-regular fa-circle"></i>
      點擊圓圈，探索區域詳情
      <br />
      <i class="fa-solid fa-map-pin"></i>
      點擊圖標，了解海洋生物
    </p>
    <Map></Map>
  </section>
</template>

<script setup>
  import Map from '@/components/map/map.vue'
</script>

<style lang="scss" scoped>
  #map {
    width: 62.5vw;
    margin: 20px auto;
    @include respond(md){
      width: 90vw;
      margin: 0 auto;
    }
    p {
      font-size: v.$sub-desktop;
      margin-top: 40px;
      margin-bottom: 10px;
      color: v.$color-skyblue;
      @include respond(md){
        margin-top: 30px;
      }
      i {
        width: 1em;
        text-align: center;
        color: v.$color-orange;
      }
    }
    div {
      margin-bottom: 75px;
      @include respond(md){
        margin-bottom: 30px;
      }
    }
  }
</style>
