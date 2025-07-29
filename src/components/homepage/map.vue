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
    margin: auto;
    @include respond(md){
      width: 90vw;
    }
    p {
      font-size: v.$sub-desktop;
      margin-top: 40px;
      margin-bottom: 10px;
      color: v.$color-skyblue;
      i {
        width: 1em;
        text-align: center;
        color: v.$color-orange;
      }
    }
    div {
      margin-bottom: 75px;
    }
  }
</style>
