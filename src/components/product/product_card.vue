<script setup>
  import { defineProps } from 'vue'
  import { RouterLink } from 'vue-router'

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  })
</script>
<template>
  <div class="product_card">
    <RouterLink :to="`/productlist/${product.id}`">
      <img :src="product.imageUrl" :alt="product.name" />
    </RouterLink>
    <div class="product_card_txt">
      <p>{{ product.name }}</p>
      <p class="price">{{ product.price }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .product_card {
    width: 14.58vw;
    border-radius: v.$border-radius-md;
    overflow: hidden;
    border: 2px solid v.$color-skyblue;
    @include respond(md) {
      width: 40.62vw;
    }
    img {
      width: 100%;
      vertical-align: bottom;
    }
    .product_card_txt {
      background-color: v.$color-white;
      .price {
        color: v.$color-orange;
      }
      p {
        text-align: center;
        color: v.$color-black;
        font-weight: v.$font-bold;
      }
    }
  }
</style>
