<template>
  <section id="store">
    <div id="store_banner">
      <img :src="banner" alt="" />
      <h2>支持我們，讓守護不斷電</h2>
    </div>
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
  import banner from '@/assets/images/homepage/store_banner.png'
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
    @include respond(md) {
      width: 90vw;
    }
    #store_banner {
      position: relative;
      display: flex;
      img {
        width: 100%;
        height: 4em;
        margin: auto;
      }
      h2 {
        color: v.$color-black;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        text-wrap: nowrap;
        @include respond(md) {
          font-size: 1em;
        }
      }
    }
    p {
      margin: 50px auto;
      @include respond(md){
        margin: 30px auto;
      }
    }
    button {
      float: right;
    }
    #store_container {
      padding: 70px 0;
      display: grid;
      grid-template-columns: repeat(auto-fill,minmax(20%,1fr));
      justify-items: center;
      gap: 20px;
      width: 100%;
      text-wrap: nowrap;
      @include respond(md){
        grid-template-columns: repeat(auto-fill,minmax(45%,1fr));
        padding: 30px 0;
      }
    }
  }
</style>
