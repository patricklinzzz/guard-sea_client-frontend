<script setup>
  import { ref, computed } from 'vue'
  import { speciesData } from '@/assets/data/Species.js'

  // 海域分類
  const areas = ['全部生物', '廣泛海域', '印度太平洋', '北太平洋', '極地海域', '特殊海域']
  const currentArea = ref('全部生物')

  const filteredAnimals = computed(() => {
    if (currentArea.value === '全部生物') return speciesData
    return speciesData.filter((item) => item.areas === currentArea.value)
  })

  function changeArea(area) {
    currentArea.value = area
  }
</script>

<template>
  <main class="wrapper">
    <div class="container">
      <nav class="area-nav">
        <button
          v-for="area in areas"
          :key="area"
          :class="['area-btn', { active: currentArea === area }]"
          @click="changeArea(area)"
        >
          <h3>{{ area }}</h3>
        </button>
      </nav>

      <h2>{{ currentArea }}</h2>
      <p class="info">點擊查看介紹</p>
      <section class="gallery">
        <router-link
          v-for="item in filteredAnimals"
          :key="item.id"
          :to="`/species/${item.id}`"
          class="gallery__card"
        >
          <img :src="item.image1" :alt="item.name" class="gallery__img" />
          <h3>{{ item.name }}</h3>
          <p class="sub-text">
            <em>{{ item.english }}</em>
          </p>
        </router-link>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .wrapper::before {
    @include bg-layer-fixed-dark;
  }

  main {
    background-color: v.$color-blue-dark;
    min-height: 100vh;
    // margin: 0 auto;
    // height: 100%;
    .container {
      width: 100%;
      margin: 0 auto;
      padding: 0 16px;
      max-width: 1200px;
      .area-nav {
        display: grid;
        justify-content: center;
        gap: 12px;
        margin: 16px auto;
        grid-template-columns: repeat(2, 1fr);
        @media (min-width: 425px) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (min-width: v.$breakpoint-md) {
          grid-template-columns: repeat(6, 1fr);
        }
      }

      .area-btn {
        appearance: none;
        border: none;
        background-color: transparent;
        color: v.$color-white;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        outline: none;
        box-shadow: none;
        padding: 3px 4px;

        &:hover {
          background-color: v.$color-skyblue;
        }
        //   &:active {
        //   background-color:v.$color-skyblue;
        // }
        //   }
      }
      .info {
        color: v.$color-skyblue;
        text-align: center;
      }
      .gallery {
        display: grid;
        grid-template-columns: repeat(2, 1fr); // 手機：2欄
        gap: 5px;
        text-align: center;
        .gallery__card {
          text-decoration: none;
          color: inherit;
          display: block;

          &:hover {
            color: inherit;
          }
        }

        @media (min-width: v.$breakpoint-md) {
          grid-template-columns: repeat(4, 1fr); // 桌面：4欄
        }
      }
    }
  }

  h2,
  h3,
  .sub-text {
    color: v.$color-white;
  }

  h2 {
    margin: 0 auto;
    text-align: center;
  }

  .sub-text {
    font-style: italic;
  }

  .gallery__img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
</style>
