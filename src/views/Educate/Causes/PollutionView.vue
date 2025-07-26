<script setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()
  // const topic = route.params.topic
  const fileName = 'pollution.png'
  const Image = new URL(`@/assets/images/Educate/Causes/${fileName}`, import.meta.url).href
</script>

<template>
  <h1>海洋汙染</h1>
  <h2>從塑膠到化學，步步侵蝕海洋生機</h2>
  <h3>
    海洋污染是全球面臨的嚴峻環境問題，每年數百萬噸的塑膠垃圾、
    工業廢水和農業廢棄物流入海洋，對海洋生態系統造成毀滅性影響。
  </h3>

  <h3>塑膠污染首當其衝</h3>
  <p>
    每年約有1100萬噸塑膠垃圾傾倒入海洋，這對海洋生物構成巨大威脅，導致每年超過1億隻海洋動物因塑膠垃圾而死亡。特別是塑膠微粒，這些直徑小於5毫米的碎屑極易被海洋生物攝入，危害其健康。
  </p>
  <h3>隱形殺手：工業廢水與農業徑流</h3>
  <p>
    除了肉眼可見的塑膠垃圾，工業廢水、農業徑流和未經處理的污水排放，造成海洋中出現大量「死亡區域」。這些區域因水中氧氣含量過低，導致大部分海洋生物無法生存。目前全球已記錄到超過500個海洋死亡區域，並且持續擴大。除了肉眼可見的塑膠垃圾，工業廢水、農業徑流和未經處理的污水排放，也導致海洋中出現大量的「死亡區域」。這些區域因水中氧氣含量過低，使得大部分海洋生物無法生存。目前全球已記錄到超過500個海洋死亡區域，它們正持續擴大，嚴重影響了海洋生態的平衡。
  </p>
  <img :src="Image" alt="pollution" />
  <p>
    長此以往，海洋生態平衡將被徹底打破，許多物種甚至面臨滅絕的危機。海洋污染不只是一個新聞頭條，更是我們賴以為生的生態系統正在經歷的真實浩劫
  </p>
</template>

<style lang="scss" scoped></style>
