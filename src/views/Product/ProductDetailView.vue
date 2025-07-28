<script setup>
  import { ref, computed } from 'vue'
  import { useProductStore } from '@/stores/product'
  import { useCartStore } from '@/stores/cart'
  import { useRouter } from 'vue-router'
  import Button from '@/components/buttons/button.vue'
  import ProductCard from '@/components/product/product_card.vue'

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

  const incrementQuantity = () => quantity.value++
  const decrementQuantity = () => {
    if (quantity.value > 1) quantity.value--
  }

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
  const router = useRouter()
  const goBack = () => {
    router.back()
  }
</script>

<template>
  <h1>商品詳細頁</h1>
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
            @click="setMainImage(index)"
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
            <div class="quantity_control">
              <button @click="decrementQuantity">-</button>
              <input type="number" min="1" :value="quantity" readonly />
              <button @click="incrementQuantity">+</button>
            </div>
          </div>
          <div class="cart_buttons">
            <Button variant="transparent" @click="addToCart">加入購物車</Button>
            <Button variant="transparent">立即購買</Button>
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
          <img src="/src/assets/images/product/slogan.png" alt="" />
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
      <div class="go_back">
        <button @click="goBack">上一頁</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product_section {
    max-width: 1920px;
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;
    .product_info {
      display: flex;
      flex-direction: row;
      justify-content: center;
      column-gap: 3.37rem;

      @include respond(md) {
        flex-direction: column;
      }
      .info_img {
        img {
          width: 100%;
        }
        .info_img_main {
          width: 25.83vw;
        }
        .info_img_thumbnails {
          display: flex;
          column-gap: 1.43rem;
          width: 80px;
          height: auto;
          cursor: pointer;
        }
      }

      .info_txt {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 33.69vw;
        .price {
          color: v.$color-orange;
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
          .quantity_control {
            display: flex;
            align-items: center;

            border-radius: v.$border-radius-sm;
            border: 2px solid v.$color-blue;

            input {
              width: 92px;
              text-align: center;
              border: none;
              outline: none;
              font-size: v.$p-desktop;
              padding: 0;
            }
            button {
              border: none;
              outline: none;
              background: v.$color-blue;
              color: v.$color-white;
              width: 35px;
              height: 100%;
              font-size: v.$p-desktop;
              text-align: center;
            }
          }
        }
        .cart_buttons {
          display: flex;
          gap: 1rem;

          :deep(button) {
            width: 14.79vw;
          }

          :deep(button:nth-child(2)) {
            background-color: v.$color-orange;
            color: v.$color-white;
            border: none;

            &:hover {
              background-color: v.$color-orange-hover;
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
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .info_main_img {
        display: flex;
        width: 20.15vw;
        justify-content: center;
        column-gap: 1rem;
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
          border: 1px solid #ddd;
          padding: 0.5rem 1rem;
          text-align: center;
        }
      }
      .slogan {
        width: 30.72vw;
        justify-self: center;
        img {
          width: 100%;
        }
      }
      .product_list {
        display: flex;
        column-gap: 1rem;
        img {
          width: 100%;
        }
      }
      .go_back {
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
            font-size: 16px;
            width: 80px;
            height: 36px;
          }
        }
      }
    }
  }
</style>
