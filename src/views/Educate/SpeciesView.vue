<script setup>
import { ref, computed } from 'vue';

// 海域分類
const areas = ['全部生物', '廣泛海域', '印度太平洋', '北太平洋', '極地海域', '特殊海域'];
const currentArea = ref('全部生物');

// 生物資料
const animals = [
  {
    id: 1,
    name: '綠蠵龜',
    english: 'Chelonia mydas',
    img: new URL('@/assets/images/Educate/Marinelife/CheloniaMydas.png', import.meta.url).href,
    area: '廣泛海域',
  },
  {
    id: 2,
    name: '藍鯨',
    english: 'Blue Whale',
    img: new URL('@/assets/images/Educate/Marinelife/CheloniaMydas.png', import.meta.url).href,
    area: '廣泛海域',
  },
  {
    id: 3,
    name: '抹香鯨',
    english: 'Sperm Whale',
    img: new URL('@/assets/images/Educate/Marinelife/CheloniaMydas.png', import.meta.url).href,
    area: '廣泛海域',
  },
  {
    id: 4,
    name: '帝王企鵝',
    english: 'Emperor Penguin',
    img: new URL('@/assets/images/Educate/Marinelife/CheloniaMydas.png', import.meta.url).href,
    area: '極地海域',
  },
];

const filteredAnimals = computed(() => {
  if (currentArea.value === '全部生物') return animals;
  return animals.filter((item) => item.area === currentArea.value);
});

function changeArea(area) {
  currentArea.value = area;
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
        {{ area }}
      </button>
    </nav>

    <h2>{{ currentArea }}</h2>
      <section class="gallery">
        <div
          v-for="item in filteredAnimals"
          :key="item.id"
          class="gallery__card"
        >
          <img
            :src="item.img"
            :alt="item.name"
            class="gallery__img"
          />
          <h3>{{ item.name }}</h3>
        <p class="sub-text"><em>{{ item.english }}</em></p>
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.wrapper::before{
  content: '';
  position: fixed;
  inset: 0;
  background-color: v.$color-blue-dark ;
  z-index: -1;
  pointer-events: none;
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
    .area-nav{
    margin: 0 auto;
    left: 0;
    right: 0;
    display: flex;
}
    .gallery {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-columns: repeat(auto-fit, minmax(140px, 2fr));
      gap: 5px;
      text-align: center;
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
