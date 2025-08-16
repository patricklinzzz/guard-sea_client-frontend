<script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { useRoute, useRouter, RouterLink } from 'vue-router'
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

  const route = useRoute()
  const router = useRouter()
  const productStore = useProductStore()
  const cartStore = useCartStore()

  const info = computed(() => productStore.getProductById(Number(route.params.id)))

  const selectedImageIndex = ref(0)
  const selectedColor = ref('')
  const selectedSize = ref('')
  const quantity = ref(1)

  const getImageUrl = (path) => {
    if (!path) return ''
    if (path.startsWith('http')) {
      return path
    }
    return `http://localhost:8888/guard-sea_api${path}`
  }
  const images = computed(() => {
    if (!info.value) return []
    const imageArray = []
    if (info.value.sub_image_1) imageArray.push(info.value.sub_image_1)
    if (info.value.sub_image_2) imageArray.push(info.value.sub_image_2)
    if (info.value.sub_image_3) imageArray.push(info.value.sub_image_3)
    return imageArray.map(getImageUrl)
  })

  const currentImage = computed(() => {
    return images.value[selectedImageIndex.value]
  })

  const selectImage = (index) => {
    selectedImageIndex.value = index
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
      image: getImageUrl(info.value.main_image_url),
      color: selectedColor.value,
      size: selectedSize.value,
      quantity: quantity.value,
    })

    alert('已加入購物車！')
  }

  const goBack = () => {
    router.back()
  }

  onMounted(() => {
    productStore.fetchProducts({ status: 1 })
  })

  watch(
    () => route.params.id,
    (newId) => {
      if (newId) {
        productStore.fetchProducts({ status: 1 })
      }
    }
  )
</script>

<template>
  <div class="product_section">
    <div v-if="!info" class="loading-state">
      <h2>⏳ 正在載入商品資訊...</h2>
    </div>
    <div v-else class="product_info">
      <div class="info_img">
        <div class="info_img_main">
          <img :src="currentImage" :alt="info.name || '商品圖片'" />
        </div>
        <div class="info_img_thumbnails">
          <img
            v-for="(img, index) in images"
            :key="index"
            :src="img"
            class="thumbnail"
            :class="{ active: selectedImageIndex === index }"
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
          <div v-if="info.color_code" class="option_group color_selection">
            <h4>顏色:</h4>
            <div class="color_buttons">
              <button
                v-for="(color, index) in (info.color_code ? info.color_code.split(',') : []).filter(
                  (c) => c.trim() !== ''
                )"
                :key="index"
                :style="{ backgroundColor: color.trim() }"
                @click="selectedColor = color.trim()"
                :class="{ selected: selectedColor === color.trim() }"
                class="color_dot"
              ></button>
            </div>
          </div>
          <div class="option_group size_selection">
            <h4>尺寸:</h4>
            <div class="size_buttons">
              <button
                v-for="size in info.size"
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

    <div v-if="info" class="info_main">
      <div v-if="info.content" v-html="info.content"></div>
      <div v-else class="no_content_text">
        <p>此商品暫無詳細內容</p>
      </div>

      <div class="related_products">
        <h3>相關商品</h3>
        <div class="product_list">
          <ProductCard
            v-for="item in productStore.relatedProducts(info.product_id)"
            :key="item.product_id"
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
