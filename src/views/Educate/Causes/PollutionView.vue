<script setup>
  import { useRoute } from 'vue-router'
  import CountUp from '@/components/edu/CountUp.vue'
  // import { onMounted, ref } from 'vue'

  const route = useRoute()
  // const topic = route.params.topic
  // const fileName = 'pollution.jpeg'
  // const Image = new URL(`@/assets/images/Educate/Causes/${fileName}`, import.meta.url).href
</script>
<template>
  <div class="title">
    <h1>海洋汙染</h1>
    <h2>從塑膠到化學，步步侵蝕海洋生機</h2>
  </div>

  <div class="wrapper">
    <section class="first">
      <p>
        海洋污染是全球面臨的嚴峻環境問題，每年數百萬噸的塑膠垃圾、工業廢水和農業廢棄物流入海洋，對海洋生態系統造成毀滅性影響。
      </p>
    </section>
    <section class="second">
      <h3>塑膠污染首當其衝</h3>
      <p>
        每年，全球約有1100萬噸塑膠垃圾最終流入海洋，這是一個驚人的數字，相當於每天有數千輛滿載的垃圾卡車將塑膠傾倒進大海。這些廢棄物並非單純存在於海面，它們會隨著洋流漂流到各個角落，甚至深入最偏遠的海域與深海環境，對整個海洋生態系統造成無法忽視的影響。
        塑膠垃圾對海洋生物帶來極大威脅。據統計，每年有超過一億隻海洋動物
        因為誤食或被塑膠纏繞而喪命，其中包括海龜、海鳥、鯨魚以及無數魚類。這些動物往往將漂浮的塑膠袋或碎片誤認為食物，例如海龜會把塑膠袋當成水母吞下，導致腸道阻塞、營養不良甚至死亡。
        更令人擔憂的是塑膠微粒（microplastics），這些直徑小於5毫米的微小碎屑來自於大型塑膠的分解、衣物纖維的脫落以及個人護理產品的微珠。由於體積極小，它們幾乎無所不在，從海水到沉積物，甚至已經在海洋食物鏈的底層被發現。許多魚類、貝類甚至浮游生物都可能攝入這些微粒，進而影響生長與生殖，並最終透過食物鏈傳遞至人類餐桌，造成潛在的健康風險。
        如果不採取行動，未來塑膠垃圾的問題只會更加嚴重。科學家預測，到2050
        年，海洋中的塑膠重量可能會超過魚類的總重量，這意味著我們的海洋將逐漸變成「塑膠湯」。因此，減少塑膠使用、強化回收再利用以及推動全球減塑政策，已經是刻不容緩的行動目標。
      </p>
    </section>
    <section class="images">
      <img src="@/assets/images/Educate/Causes/pollution.jpeg" alt="pollution" />
      <img src="@/assets/images/Educate/Causes/pollution.jpeg" alt="pollution" />
    </section>
    <section class="third">
      <h3>隱形殺手：工業廢水與農業徑流</h3>
      <p>
        除了肉眼可見、隨處漂浮的塑膠垃圾外，海洋正面臨另一個更隱蔽卻極具破壞性的危機，那就是工業廢水、農業徑流以及未經處理的生活污水排放。這些污染物含有大量氮、磷等營養鹽，當它們流入海洋後，會促進藻類過度繁殖，形成所謂的「藻華現象」。藻類大量滋生雖然短期內似乎充滿生機，但當它們死亡並分解時，會消耗水體中的氧氣，造成嚴重缺氧，進而形成所謂的「死亡區域」。
        「死亡區域」是一個極端的環境，因為水中氧含量過低，幾乎無法支撐大多數海洋生物的存活。魚類、甲殼類以及其他依賴溶氧生存的生物紛紛死亡或被迫遷徙，只剩下某些耐缺氧的微生物苟延殘喘。這種現象對當地的生態平衡造成長期而深遠的影響，漁業資源因此大幅減少，沿海居民的生計也面臨威脅。
        目前，全球已經記錄到
        超過500個海洋死亡區域，而且這個數字仍在不斷增加。這些區域多出現在大型河川入海口與沿海經濟發達地區，例如墨西哥灣、波羅的海以及中國東海等地。科學家警告，如果污染持續惡化，死亡區域可能會進一步擴大，甚至連開放海域也無法倖免。這意味著我們正逐漸把海洋變成無生命的「荒漠」。
        要解決這個問題，需要從源頭著手，減少化肥和農藥的過量使用，強化污水處理系統，並制定更嚴格的工業排放標準。同時，各國必須加強國際合作，共同保護海洋健康，避免海洋失去作為地球生命搖籃的功能。
      </p>
    </section>

    <section class="fifth">
      <p>
        長此以往，海洋生態平衡將被徹底打破，許多物種甚至面臨滅絕的危機。海洋污染不只是一個新聞頭條，更是我們賴以為生的生態系統正在經歷的真實浩劫。
      </p>
    </section>
  </div>
  <section class="data">
    <div>
      <p>
        <CountUp :number="1100" />
        噸＋
      </p>
      <hr />
      <p>
        每年約有1100萬噸
        <br />
        塑膠被傾倒入海
      </p>
    </div>
    <div>
      <p>
        <CountUp :number="1.99" />
        億+
      </p>
      <hr />
      <p>
        海洋已累積約
        <br />
        1.99億噸塑膠廢棄物
      </p>
    </div>
    <div>
      <p>
        <CountUp :number="1700" />
        萬+
      </p>
      <hr />

      <p>
        工業廢棄物每年
        <br />
        被合法傾倒入海
      </p>
    </div>
    <div>
      <p>
        <CountUp :number="500" />
        萬+
      </p>
      <hr />

      <p>
        全球已記錄超過
        <br />
        500個海洋死亡區域
      </p>
    </div>
    <div>
      <p>
        <CountUp :number="1500" />
        +
      </p>
      <hr />

      <p>
        海洋動物和植物
        <br />
        面臨滅絕風險
      </p>
    </div>
    <div>
      <p>
        <CountUp :number="50" />
        %+
      </p>
      <hr />

      <p>
        全球約有50%
        <br />
        珊瑚礁已經消失
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .wrapper {
    padding: 15px;
    margin: 0 auto;

    @media (min-width: 768px) {
      max-width: 1000px;
    }
  }

  .title {
    height: 200px;
    background-image: url('@/assets/images/Educate/Causes/pollution.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: v.$color-text-white;
    text-shadow: v.$shadow-md;
    padding: 0 20px;

    @media (min-width: 768px) {
      height: 400px;
    }
  }

  h1,
  h2,
  h3 {
    font-weight: v.$font-bold;
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
  .data {
    display: grid;
    flex-wrap: wrap;
    padding: 10px 10px 30px 10px;
    gap: 10px;
    text-align: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    grid-template-columns: 1fr;
    max-width: 200px;
    margin: 0 auto;
    gap: 25px;

    @media (min-width: 375px) {
      gap: 20px;
      max-width: 350px;
      margin: 0 auto;
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 650px) {
      gap: 20px;
      max-width: 550px;
      margin: 0 auto;
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 768px) {
      gap: 20px;
      max-width: 650px;
      margin: 0 auto;
      grid-template-columns: repeat(3, 1fr);
    }
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
</style>
