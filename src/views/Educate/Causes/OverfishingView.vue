<script setup>
  import { useRoute } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import gsap from 'gsap'
  import { SplitText } from 'gsap/SplitText'
    import ScrollArrow from '@/components/edu/ScrollArrow.vue'

  const route = useRoute()
  // const topic = route.params.topic
  // const fileName = 'pollution.jpeg'
  // const Image = new URL(`@/assets/images/Educate/Causes/${fileName}`, import.meta.url).href
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
    <h1 ref="h1">過度捕撈</h1>
    <h2 ref="h2">失衡的漁業，正在讓海洋走向沉默</h2>
    <ScrollArrow></ScrollArrow>
  </div>

  <div class="wrapper">
    <section class="first">
      <p>
        過度捕撈是全球海洋面臨的最大危機之一，每年數千萬噸的魚類被捕撈，速度遠超過牠們的繁殖能力。短期利益的競逐，換來的是整個生態系統的崩解。
      </p>
    </section>
    <section class="second">
      <h3>危機的規模</h3>
      <p>
        全球海洋正面臨前所未有的壓力，其中過度捕撈無疑是最大的隱形殺手之一。根據最新統計，全球超過
        34% 的魚類資源已被過度開發，甚至有部分高經濟價值的物種，其族群數量已銳減至過去的 10%
        以下。這不僅意味著珍稀魚類正快速消失，更多的是對整個海洋食物鏈造成連鎖效應，讓海洋逐步走向沉默。
        為何會如此嚴重？隨著捕撈技術的進步，人類得以在極短時間內從海洋中撈取大量魚群，甚至深海物種也難以倖免。底拖網漁法等高破壞性的捕撈方式，摧毀了珊瑚礁與海底棲息地，讓無數依賴這些生態環境的生物失去庇護所。當生態鏈中關鍵的掠食者與小型魚群逐漸消失，海洋整體的運作平衡也隨之崩解。
        這場危機不只影響自然界，還衝擊了人類社會。全球有超過 8
        億人依賴漁業為主要蛋白質來源與經濟支柱，但當資源枯竭，漁民的生計將陷入困境，沿海社區也面臨失業與糧食安全問題。最終，失衡的漁業將讓海洋資源陷入「無魚未來」，人類也將承受這場災難的代價。
      </p>
    </section>
    <section class="images">
      <img src="@/assets/images/Educate/Causes/overfishing1.jpeg" alt="pollution" />
      <img src="@/assets/images/Educate/Causes/overfishing2.jpeg" alt="pollution" />
    </section>

    <section class="third">
      <h3>為何這麼嚴重？</h3>
      <p>
        現代化捕撈技術讓人類能在極短的時間內捕獲驚人數量的魚類，漁船配備聲納、拖網和冷凍設備，使漁業效率達到前所未有的高度。然而，這種近乎掠奪式的捕撈模式，幾乎不給海洋任何喘息與恢復的空間。當漁獲量一再被過度開採，魚群來不及繁殖補充，族群數量迅速下降，甚至出現商業性枯竭的情況。
        更令人憂心的是，過度捕撈不僅僅耗盡魚類資源，還對整個生態系統造成毀滅性衝擊。拖網捕撈會摧毀珊瑚礁，撕裂海床，將原本豐富的棲息地變成荒蕪的沙地，使數以千計依賴珊瑚與海床生活的生物失去家園。當基礎棲地遭破壞，生態鏈隨之斷裂，從微小浮游生物到大型掠食魚類，整個系統發生連鎖反應，造成不可逆的生態崩壞，最終影響整個海洋的健康與穩定。
      </p>
    </section>

    <section class="goal-section">
      <h3 class="goal-title">我們能做什麼？</h3>
      <div class="goal">
        <div class="goal-item">
          <i class="fas fa-fish"></i>
          <p>
            選擇永續漁業產品
            <br />
            認明 MSC 認證標章
          </p>
        </div>
        <div class="goal-item">
          <i class="fas fa-anchor"></i>
          <p>
            支持禁捕季與保護區
            <br />
            讓魚群得以恢復
          </p>
        </div>
        <div class="goal-item">
          <i class="fas fa-ban"></i>
          <p>
            拒絕非法捕撈漁獲
            <br />
            讓漁業回歸理性
          </p>
        </div>
      </div>
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
    background-image: url('@/assets/images/Educate/Causes/overfishing_banner.jpeg');
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
  .goal {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 0px 25px;
    @media (min-width: 550px) {
      flex-direction: row;
    }
    // @media (min-width: 768px) {
    //   gap: 0px;
    // }
  }
  .goal-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    min-width: 180px;
    gap: 15px;
    // @media (min-width: 550px) {
    //   gap: 0px;
    // }
  }
  i {
    font-size: 3rem;
  }

  .goal-item p {
    margin: 0 auto;
    justify-content: center;
    text-align: center;
  }

  .goal-title {
    margin: 0 auto;
    text-align: center;
    padding: 10px 0;
    @media (min-width: 550px) {
      padding: 25px 0;
    }
  }
</style>
