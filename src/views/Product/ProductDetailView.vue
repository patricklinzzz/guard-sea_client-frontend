<script setup>
  import { ref, computed } from 'vue'
  import { fakeProducts } from '@/assets/data/product'
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
            <span class="selected_value">{{ selectedColor }}</span>
          </h4>
          <div class="color_buttons">
            <button
              v-for="color in info.colors"
              :key="color"
              :style="{ backgroundColor: color }"
              :class="{ active: selectedColor === color }"
              @click="selectColor(color)"
              class="color_dot"
            >
              <!-- 空白按鈕（不顯示文字，只是個色塊） -->
            </button>
          </div>
        </div>

        <div class="option_group size_selection">
          <h4>
            尺寸:
            <span class="selected_value">{{ selectedSize }}</span>
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
            <button @click="decrementQuantity" :disabled="selectedQuantity <= 1">-</button>
            <input
              type="number"
              v-model.number="selectedQuantity"
              min="1"
              :max="selectedVariant ? selectedVariant.stock : 1"
              readonly
            />
            <button
              @click="incrementQuantity"
              :disabled="
                selectedQuantity >= (selectedVariant ? selectedVariant.stock : 1) ||
                (selectedVariant && selectedVariant.stock === 0)
              "
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        class="add_to_cart_btn"
        @click="addToCart"
        :disabled="!selectedVariant || selectedVariant.stock === 0 || selectedQuantity === 0"
      >
        {{ selectedVariant && selectedVariant.stock === 0 ? '已售罄' : '加入購物車' }}
      </button>
    </div>
  </div>
  <!-- <h3 class="price">價格: NT$ {{ displayPrice }}</h3>
        <p class="stock_status">
          庫存:
          <span
            v-if="selectedVariant && selectedVariant.stock > 0"
            :class="{
              'in-stock': selectedVariant.stock > 10,
              'low-stock': selectedVariant.stock <= 10,
            }"
          >
            {{ selectedVariant.stock }} 件有貨
          </span>
          <span v-else-if="selectedVariant && selectedVariant.stock === 0" class="out-of-stock">
            已售罄
          </span>
          <span v-else>請選擇顏色和尺寸</span>
        </p> -->
</template>
<style lang="scss" scoped>
  .product_info {
    display: flex;
    justify-content: center;
  }
  .thumbnail {
    width: 80px;
    height: auto;
    cursor: pointer;
    border: 2px solid transparent;
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
