<template>
  <section id="store">
    <h2 id="store_banner">支持我們，讓守護不斷電</h2>
    <p>你購買的每一件商品，我們將捐出50%，支持海龜回家、珊瑚重生，讓愛海的你成為改變的一部分</p>
    <Button @click="router.push('/productlist')">
      來去支持
      <i class="fa-solid fa-chevron-right"></i>
    </Button>
    <div id="store_container">
      <ProductCard
        v-for="product in productsToShow"
        :key="product.id"
        :product="product"
      ></ProductCard>
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue'
  import Button from '@/components/buttons/button.vue'
  import ProductCard from '@/components/product/product_card.vue'
  import { fakeProducts } from '@/assets/data/product'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const productsToShow = computed(() => {
    let products = [...fakeProducts]
    return products.slice(0, 4)
  })
</script>

<style lang="scss" scoped>
  #store {
    width: 62.5vw;
    margin: auto;
    #store_banner {
      background: url('@/assets/images/homepage/store_banner.png') no-repeat center/ auto 3em;
      text-align: center;
      height: 3em;
      padding-top: 0.4em;
      color: v.$color-black;
    }
    p {
      margin: 50px auto;
    }
    button {
      float: right;
    }
    #store_container {
      padding: 70px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      width: 100%;
    }
  }
</style>
