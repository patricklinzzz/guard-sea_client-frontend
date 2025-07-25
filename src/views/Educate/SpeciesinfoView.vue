<script setup>
  import { ref, onMounted } from 'vue'
  const props = defineProps(['id'])
  const animal = ref({})
  // animal.value = animals[id]
  const animals = [
    {
      id: 1,
      areas: '廣泛海域',
      name: '綠蠵龜',
      english: 'Chelonia mydas',
      status: 'CR極危',
      classification: '爬蟲綱／海龜科',
      length: '可達 1.5 公尺',
      weight: '最多超過 200 公斤',
      lifespan: '可活超過 80 年',
      distribution: '全球熱帶與亞熱帶海域，包括台灣東部、蘭嶼、小琉球一帶',
      image1: new URL(
        '../../assets/images/Educate/General_Oceanic_Region/Chelonia_mydas1.jpg',
        import.meta.url
      ).href,
      image2: new URL(
        '../../assets/images/Educate/General_Oceanic_Region/Chelonia_mydas2.jpg',
        import.meta.url
      ).href,
      image3: new URL(
        '../../assets/images/Educate/General_Oceanic_Region/Chelonia_mydas2.jpg',
        import.meta.url
      ).href,
      description:
        '綠蠵龜是體型最大的草食性海龜，廣泛分布於熱帶與亞熱帶海域，包括台灣東部與小琉球。牠們以海草和藻類為主食，具有強烈的歸巢性，會跨越數千公里回到出生地產卵。 目前綠蠵龜被國際自然保育聯盟列為瀕危物種，主要受到漁業混獲、海岸開發、垃圾污染與非法獵捕等威脅。保育行動包含參與淨灘、避免購買龜製品與推廣海洋教育，讓更多人關注牠們的生存困境與生態價值。',
    },
  ]
  onMounted(() => {
    animal.value = animals.find((a) => a.id === Number(props.id)) || animals[0]
  })
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="images" v-if="animal.image1">
        <img :src="animal.image1" alt="圖片 1" />
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

    <div class="images" v-if="animal.image1">
      <img :src="animal.image2" alt="圖片 2" />
      <img :src="animal.image2" alt="圖片 3" />
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
