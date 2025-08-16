<script setup>
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  })

  const getImageUrl = computed(() => {
    const path = props.product.main_image_url
    if (!path) return ''
    if (path.startsWith('http')) {
      return path
    }
    return `http://localhost:8888/guard-sea_api${path}`
  })
</script>
<template>
  <div class="product_card">
    <RouterLink :to="`/productlist/${product.product_id}`">
      <img :src="getImageUrl" :alt="product.name" />
      <div class="product_card_txt">
        <p>{{ product.name }}</p>
        <p class="price">${{ product.price }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
  .product_card {
    width: 14.58vw;
    border-radius: v.$border-radius-md;
    overflow: hidden;
    border: 2px solid v.$color-skyblue;
    cursor: pointer;
    a {
      text-decoration: none;
      display: block;
    }

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
        font-weight: v.$font-bold;
      }
      p {
        text-align: center;
        color: v.$color-black;
        font-weight: v.$font-bold;
      }
    }
  }
</style>
