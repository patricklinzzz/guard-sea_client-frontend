<!-- <script setup>
  import { ref, computed } from 'vue'
  import { useProductStore } from '@/stores/product_store'
  import { useCartStore } from '@/stores/cart_store'
  import Button from '@/components/buttons/button.vue'
  import ProductCard from '@/components/product/product_card.vue'
  import QuantityControl from '@/components/product/quantity_button.vue'
  const props = defineProps({
    id: {
      type: [String, Number],
      required: true,
    },
  })

  const productStore = useProductStore()
  const cartStore = useCartStore()

  const info = computed(() => productStore.getProductById(props.id))

  const currentImageIndex = ref(0)
  const currentImage = computed(() => info.value.images[currentImageIndex.value])
  const setMainImage = (index) => {
    currentImageIndex.value = index
  }

  const selectedColor = ref('')
  const selectedSize = ref('')
  const quantity = ref(1)

  const addToCart = () => {
    if (!selectedColor.value || !selectedSize.value) {
      alert('請選擇顏色與尺寸')
      return
    }

    cartStore.addItem({
      id: info.value.id,
      name: info.value.name,
      price: info.value.price,
      image: info.value.images[0],
      color: selectedColor.value,
      size: selectedSize.value,
      quantity: quantity.value,
    })

    alert('已加入購物車！')
  }
</script> -->
<script setup>
  import { ref, computed } from 'vue'
  import { useProductStore } from '@/stores/product_store'
  import { useCartStore } from '@/stores/cart_store'
  import Button from '@/components/buttons/button.vue'
  import ProductCard from '@/components/product/product_card.vue'
  import QuantityControl from '@/components/product/quantity_button.vue'

  const props = defineProps({
    id: {
      type: [String, Number],
      required: true,
    },
  })

  const productStore = useProductStore()
  const cartStore = useCartStore()

  const info = computed(() => productStore.getProductById(props.id))

  const selectedImageIndex = ref(0)

  const currentImage = computed(() => {
    return info.value.images[selectedImageIndex.value]
  })

  const selectImage = (index) => {
    selectedImageIndex.value = index
  }

  const selectedColor = ref('')
  const selectedSize = ref('')
  const quantity = ref(1)

  const addToCart = () => {
    if (!selectedColor.value || !selectedSize.value) {
      alert('請選擇顏色與尺寸')
      return
    }

    cartStore.addItem({
      id: info.value.id,
      name: info.value.name,
      price: info.value.price,
      image: info.value.imageUrl,
      color: selectedColor.value,
      size: selectedSize.value,
      quantity: quantity.value,
    })

    alert('已加入購物車！')
  }
</script>
<template>
  <div class="product_section">
    <div class="product_info">
      <div class="info_img">
        <div class="info_img_main">
          <img :src="currentImage" :alt="info?.name || '商品圖片'" />
        </div>
        <div class="info_img_thumbnails">
          <img
            v-for="(img, index) in info.images"
            :key="index"
            :src="img"
            class="thumbnail"
            :class="{ active: currentImageIndex === index }"
            @click="selectImage(index)"
            alt=""
          />
        </div>
      </div>
      <div class="info_txt">
        <h2>{{ info.name }}</h2>
        <h3>{{ info.description }}</h3>
        <h3 class="price">${{ info.price }}</h3>
        <div class="options">
          <div class="option_group color_selection">
            <h4>顏色:</h4>
            <div class="color_buttons">
              <button
                v-for="color in info.colors"
                :key="color"
                :style="{ backgroundColor: color }"
                @click="selectedColor = color"
                :class="{ selected: selectedColor === color }"
                class="color_dot"
              ></button>
            </div>
          </div>
          <div class="option_group size_selection">
            <h4>尺寸:</h4>
            <div class="size_buttons">
              <button
                v-for="size in info.sizes"
                :key="size"
                @click="selectedSize = size"
                :class="{ selected: selectedSize === size }"
              >
                {{ size }}
              </button>
            </div>
          </div>
          <div class="option_group quantity_selection">
            <h4>數量:</h4>
            <QuantityControl v-model="quantity" />
          </div>
          <div class="cart_buttons">
            <Button variant="transparent" @click="addToCart">加入購物車</Button>
            <RouterLink to="/login"><Button variant="default">立即購買</Button></RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="info_main">
      <div class="product_features">
        <div class="feature_item">環保</div>
        <div class="feature_item">透氣</div>
        <div class="feature_item">減塑</div>
      </div>
      <div class="info_main_img">
        <img v-for="(img, index) in info.images" :key="index" :src="img" :alt="img.name" />
      </div>
      <table class="size_table">
        <thead>
          <tr>
            <th>尺寸</th>
            <th>胸圍(cm)</th>
            <th>衣長(cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S</td>
            <td>48</td>
            <td>65</td>
          </tr>
          <tr>
            <td>M</td>
            <td>51</td>
            <td>68</td>
          </tr>
          <tr>
            <td>L</td>
            <td>54</td>
            <td>71</td>
          </tr>
          <tr>
            <td>XL</td>
            <td>57</td>
            <td>74</td>
          </tr>
        </tbody>
      </table>
      <div class="support_banner">
        <div class="slogan">
          <img src="/src/assets/images/product/slogan.jpg" alt="" />
        </div>
        <p>
          您購買的每一件商品，我們將捐助「綠蠵龜野放計畫」，支持追蹤器、照護飼料與環境復育珊瑚重生，讓愛海的你成為改變的一部分。
        </p>
      </div>
      <div class="related_products">
        <h3>相關商品</h3>
        <div class="product_list">
          <ProductCard
            v-for="item in productStore.relatedProducts(info.id)"
            :key="item.id"
            :product="item"
          />
        </div>
      </div>
      <RouterLink to="/productlist" class="go_back">
        <button @click="goBack">上一頁</button>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product_section {
    max-width: 1920px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .product_info {
      display: flex;
      justify-content: center;
      padding: 2%;
      column-gap: 3.37rem;
      max-width: 1200px;
      @include respond(md) {
        flex-wrap: wrap;
        padding: 5%;
      }

      .info_img {
        display: flex;
        flex-direction: column;
        img {
          width: 100%;
        }
        .info_img_main {
          width: 25.83vw;
          align-self: center;
          @include respond(md) {
            width: 87.5vw;
          }
        }
        .info_img_thumbnails {
          display: flex;
          flex-direction: row;
          column-gap: 1.1rem;
          width: 7.81vw;
          height: auto;
          cursor: pointer;
          @include respond(md) {
            width: 26.56vw;
          }
        }
      }

      .info_txt {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex-basis: 30%;
        > h2 {
          @include respond(md) {
            padding-top: 10px;
          }
        }
        > h3 {
          text-align: justify;
        }

        .price {
          color: v.$color-orange;
          font-weight: v.$font-bold;
        }
      }
      .options {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        .option_group {
          display: flex;
          column-gap: 1rem;
          button {
            cursor: pointer;
            border: none;
            outline: 1px solid black;
          }
          .color_buttons {
            display: flex;
            column-gap: 1rem;
            .selected {
              transform: scale(1.3);
            }
            button {
              border-radius: 50%;
              width: 30px;
              height: 30px;
            }
          }
          .size_buttons {
            display: flex;
            column-gap: 1rem;
            .selected {
              background-color: v.$color-skyblue;
            }
            button {
              height: auto;
              outline: 2px solid v.$color-blue;
              background: v.$color-white;
              border-radius: v.$border-radius-sm;
              padding: 5px 20px;
            }
          }
        }
        .cart_buttons {
          display: flex;
          gap: 1rem;

          :deep(button) {
            width: 14.79vw;
          }
          @include respond(md) {
            :deep(button) {
              width: 39.68vw;
            }
          }
        }
      }
    }
    .info_main {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      max-width: 1200px;
      text-align: center;
      p {
        color: v.$color-text-main;
      }
      @include respond(md) {
        max-width: 320px;
      }

      .product_features {
        display: flex;
        justify-content: center;
        align-content: center;
        gap: 2rem;
        margin-top: 2rem;

        .feature_item {
          border: 1px solid v.$color-orange;
          border-radius: 50%;
          width: 7.5vw;
          height: 7.5vw;
          aspect-ratio: 1 / 1;
          display: flex;
          justify-content: center;
          align-items: center;
          @include respond(md) {
            width: 25vw;
            height: 25vw;
            aspect-ratio: 1 / 1;
          }
        }
      }
      .info_main_img {
        display: flex;
        width: 20.15vw;
        justify-content: center;
        column-gap: 1rem;
        @include respond(md) {
          flex-wrap: wrap;
          row-gap: 1rem;
          width: 87.5vw;
        }
        img {
          width: 100%;
        }
      }
      .size_table {
        margin-top: 2rem;
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          border: 1px solid v.$color-orange;
          padding: 0.5rem 1rem;
          text-align: center;
        }
      }
      .slogan {
        width: 30.72vw;
        justify-self: center;
        margin: 1rem 0;
        img {
          width: 100%;
        }
        @include respond(md) {
          width: 80vw;
        }
      }
      .product_list {
        display: flex;
        column-gap: 1rem;
        @include respond(md) {
          padding: 1rem 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        img {
          width: 100%;
        }
      }
      .go_back {
        text-decoration: none;
        color: inherit;
        button {
          margin: 0 auto;
          display: block;
          border: none;
          width: 85px;
          height: 40px;
          border-radius: 4px;
          background-color: v.$color-skyblue-light;
          font-size: 18px;
          cursor: pointer;
          @include respond(md) {
            margin-bottom: 20px;
            width: 88px;
            font-size: 16px;
            width: 80px;
            height: 36px;
          }
        }
      }
    }
  }
</style>
