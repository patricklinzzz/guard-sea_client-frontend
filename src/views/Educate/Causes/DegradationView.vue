<script setup>
  import { useRoute } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import gsap from 'gsap'
  import { SplitText } from 'gsap/SplitText'
  import ScrollArrow from '@/components/edu/ScrollArrow.vue'

  const route = useRoute()
  const h1 = ref(null)
  const h2 = ref(null)
  gsap.registerPlugin(SplitText)
  onMounted(() => {
    let h1_split = new SplitText(h1.value, { type: 'lines' })
    let h2_split = new SplitText(h2.value, { type: 'lines' })
    gsap
      .timeline()
      .from(h1_split.lines, {
        yPercent: 100,
        duration: 2,
        ease: 'expo.out',
        stagger: 0.1,
      })
      .from(
        h2_split.lines,
        {
          yPercent: 100,
          duration: 2,
          ease: 'expo.out',
          stagger: 0.1,
        },
        '<'
      )
  })
</script>
<template>
  <div class="title">
    <h1 ref="h1">生境破壞</h1>
    <h2 ref="h2">棲地消失，生物的未來也隨之消逝。</h2>
    <ScrollArrow></ScrollArrow>
  </div>

  <div class="wrapper">
    <section class="first">
      <p>
        生境破壞是全球面臨的嚴峻環境問題，每年因森林砍伐、城市擴張與農業開發，數以百萬計的野生動植物失去棲息地，對生態系統造成毀滅性影響。
      </p>
    </section>

    <section class="second">
      <h3>什麼是生境破壞？</h3>
      <div class="circle-container">
        <div class="circle">
          <h2>
            沿海
            <br />
            開發
          </h2>
        </div>
        <div class="circle">
          <h2>
            濕地
            <br />
            排水
          </h2>
        </div>
        <div class="circle"><h2>疏浚</h2></div>
      </div>
      <p>
        生境破壞是指動植物賴以生存的自然棲息地被破壞或消失，導致野生生物失去家園，甚至面臨滅絕危機。這種破壞絕大多數源於人類活動，包括森林砍伐、城市擴張、農業開發、礦業開採，甚至是濫伐漁業。當森林被砍伐、濕地被填平、海岸被人工結構覆蓋，原本多樣化的生態系統被切割、縮小甚至完全消失，使得野生動物無法覓食、繁殖，族群數量急速下降。
        根據研究，全球超過 80%
        的物種滅絕與生境破壞直接相關。這不僅對動植物造成威脅，還會引發嚴重的連鎖效應，包括氣候變遷、土壤退化、水資源枯竭，最終影響人類的生存與發展。
        要減緩生境破壞，我們可以從日常生活做起：支持永續農業與木材來源、減少過度開發需求、保護森林及濕地，並參與生態復育計畫。守護棲地，不只是保護野生動物，更是為我們共同的未來負責。
      </p>
    </section>
    <section class="images">
      <img src="@/assets/images/Educate/Causes/degradation1.jpeg" alt="pollution" />
      <img src="@/assets/images/Educate/Causes/degradation2.jpeg" alt="pollution" />
    </section>
    <section class="third">
      <h3>為什麼這麼嚴重？</h3>
      <p>
        當森林被砍伐、濕地遭填平、海岸被水泥覆蓋，無數動植物失去家園，生態鏈隨之崩解。生境破壞是全球生物多樣性消失的主要原因，科學研究顯示，約
        80%的物種滅絕與生境破壞有關。當棲地縮小或分裂，動物無法覓食與繁殖，基因多樣性下降，滅絕危機加劇。這不僅威脅野生動植物，也影響人類賴以生存的糧食、水資源與氣候穩定。唯有守護自然棲地，維護生態平衡，我們才能確保地球生命共同體的永續發展。
      </p>
    </section>

    <section class="action-section">
      <h3 class="action-title">我們能做什麼？</h3>
      <ul class="action-list">
        <li>選擇永續木材與紙製品，減少森林砍伐</li>
        <li>支持保護區與國家公園的建立</li>
        <li>減少消費與浪費，避免過度開發需求</li>
        <li>支持環境保護組織，參與植樹或濕地保育計畫</li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    padding: 15px;
    color: v.$color-text-main;
    margin: 0 auto;

    @media (min-width: 768px) {
      max-width: 1000px;
    }
  }

  .title {
    // height: 200px;
    height: 100vh;
    background-image: url('@/assets/images/Educate/Causes/degradation_banner.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: v.$color-text-white;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.7);
    padding: 0 20px;

    @media (min-width: 768px) {
      // height: 400px;
      height: 100vh;
    }
  }

  h1,
  h2,
  h3 {
    font-weight: v.$font-bold;
    overflow: hidden;
  }
  h1,
  h2 {
    letter-spacing: v.$letter-spacing-wide;
  }
  h3 {
    letter-spacing: v.$letter-spacing-base;
    color: v.$color-text-main;
  }

  p {
    letter-spacing: v.$letter-spacing-normal;
    line-height: v.$line-height-loose;
    text-align: justify;
    color: v.$color-text-main;
  }

  .images {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin: 20px auto;

    @media (min-width: 668px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .images img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    display: block;
  }
  ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  .circle-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 10px;
    padding: 20px 0px;
    @media (min-width: 668px) {
      gap: 30px;
      padding: 40px 0px;
    }
  }
  .circle {
    border-radius: 50%;
    border: 1px solid v.$color-text-main;
    gap: 30px;
    width: 90px;
    height: 90px;
    text-align: center;
    display: flex;
    padding: 0px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    line-height: 1;
    h2 {
      margin-right: -5px;
    }

    @media (min-width: 768px) {
      gap: 50px;
      width: 130px;
      height: 130px;
    }
    // @media (min-width: 800px) {
    //   width: 160px;
    //   height: 160px;
    // }
  }
</style>
