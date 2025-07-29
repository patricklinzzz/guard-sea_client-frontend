<script setup>
  import { speciesData } from '@/assets/data/Species.js'
  import { useRoute } from 'vue-router'
  import { ref, watch } from 'vue'
  import Button from '@/components/buttons/button.vue'

  // 取得路由
  const route = useRoute()

  // 定義一個 animal 物件（可響應）
  const animal = ref({})

  // 初始化：根據當前 id 設定 animal
  animal.value = speciesData.find((item) => item.id === Number(route.params.id))

  // 監聽 route id 變化，重新指定 animal
  watch(
    () => route.params.id,
    (newId) => {
      animal.value = speciesData.find((item) => item.id === Number(newId))
      console.log('切換動物 id:', newId)
    }
  )

  // const randomAnimals = ref([])

  // onMounted(() => {
  //   // 複製 animals 並打亂順序
  //   const shuffled = [...speciesData].sort(() => 0.5 - Math.random())
  //   // 取出前4筆
  //   randomAnimals.value = shuffled.slice(0, 4)
  // })
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="images" v-if="animal.image2">
        <img :src="animal.image2" alt="圖片2" />
      </div>
      <!-- <p class="english">{{ animals[0].english }}</p> -->

      <div class="animalInfo">
        <h2 class="name">{{ animal.name }}</h2>
        <ul>
          <li>
            <p>學名：{{ animal.english }}</p>
          </li>
          <li>
            <p>海域：{{ animal.areas }}</p>
          </li>
          <li>
            <p>分類：{{ animal.classification }}</p>
          </li>
          <li>
            <p>體長：{{ animal.length }}</p>
          </li>
          <li>
            <p>瀕危指標：{{ animal.status }}</p>
          </li>
          <li>
            <p>體重：{{ animal.weight }}</p>
          </li>
          <li>
            <p>壽命：{{ animal.lifespan }}</p>
          </li>
          <li>
            <p>分布：{{ animal.distribution }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="description">
    <div class="description_first">
      <h2>詳細介紹</h2>
      <p>{{ animal.description }}</p>
    </div>

    <div class="images" v-if="animal.image3">
      <img :src="animal.image3" alt="圖片 3" />
      <img :src="animal.image4" alt="圖片 4" />
    </div>
  </div>

  <div class="viewMore"><h1>點擊生物看更多</h1></div>

  <!-- <section class="gallery">
    <router-link
      v-for="item in randomAnimals"
      :key="item.id"
      :to="`/species/${item.id}`"
      class="gallery__card"
    >
      <img :src="item.image1" :alt="item.name" class="gallery__img" />
      <h3>{{ item.name }}</h3>
      <p class="english">
        <em>{{ item.english }}</em>
      </p>
    </router-link> -->

  <router-link to="/edu/species" class="gallery__more"><Button>更多生物></Button></router-link>
  <div class="more">
    <router-link
      v-for="item in speciesData.slice(0, 4)"
      :key="item.id"
      :to="`/edu/species/${item.id}`"
      class="gallery__card"
    >
      <img :src="item.image1" :alt="item.name" class="gallery__img" />
      <h3>{{ item.name }}</h3>
      <p class="sub-text">
        <sub>{{ item.english }}</sub>
      </p>
    </router-link>
  </div>

  <!-- <div class="animals"></div> -->
</template>

<style lang="scss" scoped>
  .wrapper {
    background-color: v.$color-blue-dark;
  }
  .container {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    // gap: 10px;
    color: v.$color-text-white;
    padding: 30px 20px;
    margin: 0 auto;
    max-width: 1200px;

    @media (min-width: 768px) {
      gap: 20px;
    }
  }

  .images {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    img {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }
  }
  .animalInfo {
    padding: 10px 0px;
  }

  .description {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    // text-align: center;
    padding: 15px 15px;
    max-width: 1200px;
    p,
    h2 {
      color: v.$color-text-main;
    }
    h2 {
      text-align: center;
    }
  }
  .description_first {
    padding-bottom: 20px;
    // gap: 10px;
  }

  .viewMore {
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 768px) {
    .container {
      display: flex;
      flex-direction: row;
      gap: 30px;
    }

    .animalInfo {
      display: flex;
      flex-direction: column;
    }
    .images {
      display: flex;
      width: calc(50% - 10px);

      flex-direction: row;
    }
    .description img {
      width: 100%;
    }
  }
  h1,
  h2,
  h3 {
    font-weight: v.$font-bold;
  }
  h1 {
    letter-spacing: v.$letter-spacing-wide;
    color: v.$color-text-main;
  }

  p {
    letter-spacing: v.$letter-spacing-normal;
    line-height: v.$line-height-relaxed;
  }
  .more {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px 10px;
    @media (min-width: v.$breakpoint-md) {
      grid-template-columns: repeat(4, 1fr); // 桌面：4欄
    }
    .gallery__card {
      text-decoration: none;
      color: inherit;
      display: block;
      max-width: 1200px;

      h3 {
        color: v.$color-text-main;
      }
      &:hover {
        color: inherit;
      }
    }
    .gallery__img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  .gallery__more {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    padding: 10px 0px;
  }
  // .sub {
  //   color: v.$color-text-main;
  // }
  // .more {
  //   display: grid;
  // }
</style>
