<script setup>
  import { ref, computed } from 'vue'
  import { fakeProducts } from '@/assets/data/product'
  import Button from '@/components/buttons/button.vue'
  const props = defineProps(['id'])
  const info = computed(() => {
    return fakeProducts.find((item) => {
      return item.id === Number(props.id)
    })
  })
  const currentImage = ref(info.value.images[0])
  const setMainImage = (index) => {
    currentImageIndex.value = index
  }
</script>

<template>
  <h1>商品詳細頁</h1>
  <div class="product_info">
    <div>
      <div class="info_img">
        <img :src="currentImage" :alt="info.name" />
        <div class="info_img_thumbnails">
          <img
            v-for="(img, index) in info.images"
            :key="index"
            :src="img"
            class="thumbnail"
            @click="currentImage = img"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="info_txt">
      <h2>{{ info.name }}</h2>
      <h3>{{ info.description }}</h3>
      <h3>{{ info.price }}</h3>
      <div class="options">
        <div class="option_group color_selection">
          <h4>
            顏色:
            <span class="selected_value"></span>
          </h4>
          <div class="color_buttons">
            <button
              v-for="color in info.colors"
              :key="color"
              :style="{ backgroundColor: color }"
              @click="selectColor(color)"
              class="color_dot"
            ></button>
          </div>
        </div>

        <div class="option_group size_selection">
          <h4>
            尺寸:
            <span class="selected_value"></span>
          </h4>
          <div class="size_buttons">
            <button v-for="size in info.sizes" :key="size">
              {{ size }}
            </button>
          </div>
        </div>

        <div class="option_group quantity_selection">
          <h4>數量:</h4>
          <div class="quantity_control">
            <button @click="decrementQuantity">-</button>
            <input type="number" min="1" readonly value="1" />
            <button @click="incrementQuantity">+</button>
          </div>
        </div>
        <Button variant="transparent">加入購物車</Button>
        <Button variant="transparent">立即購買</Button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .product_info {
    display: flex;
    justify-content: center;
    .info_img {
      width: 18.75vw;
      img {
        width: 100%;
      }
      .thumbnail {
        width: 80px;
        height: auto;
        cursor: pointer;
        border: 2px solid transparent;
      }
    }
  }

  .option_group {
    display: flex;
    .color_buttons {
      display: flex;
      column-gap: 1rem;

      button {
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }
    }
  }
</style>
