<script setup>
  import { ref, computed } from 'vue'

  // 海域分類
  const areas = ['全部生物', '廣泛海域', '印度太平洋', '北太平洋', '極地海域', '特殊海域']
  const currentArea = ref('全部生物')

  // 生物資料
  const animals = [
    {
      id: 1,
      name: '綠蠵龜',
      english: 'Chelonia mydas',
      img: new URL(
        '@/assets/images/Educate/General_Oceanic_Region/Chelonia_mydas/Chelonia_mydas.png',
        import.meta.url
      ).href,
      area: '廣泛海域',
    },
    {
      id: 2,
      name: '海獺',
      english: 'Enhydra lutris',
      img: new URL(
        '@/assets/images/Educate/North_Pacific_Region/Enhydra_lutris/Enhydra_lutris.png',
        import.meta.url
      ).href,
      area: '北太平洋',
    },
    {
      id: 3,
      name: '皇帝企鵝',
      english: 'Aptenodytes_forsteri',
      img: new URL('@/assets/images/Educate/Polar_Region/Aptenodytes_forsteri.png', import.meta.url)
        .href,
      area: '極地海域',
    },
    {
      id: 4,
      name: '隆頭鸚哥魚',
      english: 'Bolbometopon_muricatum',
      img: new URL(
        '@/assets/images/Educate/Indo_Pacific_Region/Bolbometopon_muricatum.png',
        import.meta.url
      ).href,
      area: '印度太平洋',
    },
    {
      id: 5,
      name: '鋸鰩',
      english: 'ristis pristis',
      img: new URL('@/assets/images/Educate/Special_Region/Pristis_pristis.png', import.meta.url)
        .href,
      area: '特殊海域',
    },
  ]

  const filteredAnimals = computed(() => {
    if (currentArea.value === '全部生物') return speciesData
    return speciesData.filter((item) => item.area === currentArea.value)
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
      <section class="gallery">
        <router-link
          v-for="item in filteredAnimals"
          :key="item.id"
          :to="`/edu/Species/1`"
          class="gallery__card"
        >
          <img :src="item.img" :alt="item.name" class="gallery__img" />
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
        display: flex;
        justify-content: center;
        gap: 12px;
        margin: 16px auto;
      }
      .area-btn {
        all: unset;
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
