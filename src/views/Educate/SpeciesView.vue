<script setup>
  import { ref, computed, watch } from 'vue'
  import { speciesData } from '@/assets/data/Species.js'
  import BubbleEffect from '@/components/edu/BubbleEffect.vue'
  import LightRays from '@/components/edu/LightRays.vue'
  import { useRouter, useRoute } from 'vue-router'
  import CategoryButtons from '@/components/buttons/category_button.vue'

  const router = useRouter()
  const route = useRoute() // 獲取當前路由實例，用於監聽路由變化

  // 海域分類

  const areas = ['全部生物', '廣泛海域', '印度太平洋', '北太平洋', '極地海域', '特殊海域']
  const currentArea = ref('')

  // 監聽路由參數的變化，更新 currentType 顯示
  watch(
    () => route.params.typeId,
    (newId) => {
      currentArea.value = areas.includes(newId) ? newId : '全部生物'
    },
    { immediate: true } // immediate: true 確保組件掛載時就執行一次
  )

  const filteredAnimals = computed(() => {
    if (currentArea.value === '全部生物') return speciesData
    return speciesData.filter((item) => item.areas === currentArea.value)
  })

  function changeArea(area) {
    currentArea.value = area
    // 傳遞路由參數
    router.push({
      name: 'species',
      params: { typeId: area },
    })
  }
</script>

<template>
  <main class="wrapper">
    <div class="container">
      <LightRays />
      <CategoryButtons :categories="areas" v-model:currentCategory="currentArea" class="category" />
      <!-- <nav class="area-nav">
        <button
          v-for="area in areas"
          :key="area"
          :class="['area-btn', { active: currentArea === area }]"
          @click="changeArea(area)"
        >
          <h3>{{ area }}</h3>
        </button>
      </nav> -->

      <h2 class="title">
        {{ currentArea }}
      </h2>

      <p class="info">
        點擊查看介紹
        <div class="bw">
          <BubbleEffect />
          
          <BubbleEffect />
        </div>
      </p>

      <section class="gallery">
        <router-link
          v-for="item in filteredAnimals"
          :key="item.id"
          :to="`/edu/species/${item.id}`"
          class="gallery__card breathing"
        >
          <img :src="item.image1" :alt="item.name" class="gallery__img" />
          <h3>{{ item.name }}</h3>
          <p class="sub-text">
            <em>{{ item.english }}</em>
          </p>
        </router-link>
      </section>
    </div>

    <p class="slogan">
      願地球未來仍能與形形色色
            <br />
            的生物綿延不絕地連結
      <div class="bw1">
        <BubbleEffect />
      </div>
      <div class="bw2">
        <BubbleEffect />
      </div>
    </p>
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
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        outline: none;
        box-shadow: none;
        position: relative;
        // margin-right: 5px;

        &.active {
          background-color: v.$color-skyblue-light;
          color: v.$color-blue-dark;
          border-radius: v.$border-radius-sm;
        }

        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 24px;
          background-color: #fff;
          // margin-right: -15px;
        }

        &:last-child::after {
          display: none;
        }
      }

      .area-btn.active h3 {
        color: v.$color-blue-dark;
        text-align: center;
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
    letter-spacing: v.$letter-spacing-wide;
  }

  .sub-text {
    font-style: italic;
  }

  .gallery__img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .slogan {
    text-align: center;
    color: v.$color-text-white;
    padding: 30px 0;
  }
  @keyframes breathing {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .breathing {
    animation: breathing 3s ease-in-out infinite;
    transition: transform 0.3s ease;
    will-change: transform;
  }
  .category {
    padding: 20px 0px 20px 0px;
    // max-width: 1300px;
    // margin: 0px;
    // flex-wrap: nowrap !important;
  }
  .category :deep(li) {
    flex-wrap: nowrap !important; // ✅ 強制不換行
  }

  .bw {
    position: absolute; 
    width: 95%; 
    pointer-events: none; 
    overflow: visible; 
  }
  .bw1 {
    position: absolute; 
    width: 98%; 
    pointer-events: none; 
    overflow: visible; 
  }
  .bw2 {
    position: absolute;
    width: 80%; 
    pointer-events: none; 
    overflow: visible; 
  }

  // .category ul {
  //   flex-wrap: nowrap; // 🔐 強制單行不換行
  // }
</style>
