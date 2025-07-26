<script setup>
  import { speciesData } from '@/assets/data/Species.js'
  import { useRoute } from 'vue-router'

  // animal.value = animals[id]
  // onMounted(() => {
  //   animal.value = animals.find((a) => a.id === Number(props.id)) || animals[0]
  // })
  const route = useRoute()
  const animal = speciesData.find((item) => item.id === Number(route.params.id))
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="images" v-if="animal.image2">
        <img :src="animal.image2" alt="圖片2" />
      </div>
      <!-- <p class="english">{{ animals[0].english }}</p> -->

      <div class="animalInfo">
        <h1 class="areas">{{ animal.areas }}</h1>
        <h2 class="name">{{ animal.name }}</h2>
        <ul>
          <li>
            <p>學名：{{ animal.english }}</p>
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
  <!-- <div class="animals"></div> -->
</template>

<style lang="scss" scoped>
  .wrapper {
    background-color: v.$color-blue-dark;
  }
  .container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    // gap: 10px; // 區塊之間留間距
    color: v.$color-text-white;
    padding: 30px 0px;
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
    max-width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    text-align: center;
    padding-bottom: 15px;
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
      width: calc(50%);
      flex-direction: row;
    }
    .description img {
      width: 100%;
    }
  }
</style>
