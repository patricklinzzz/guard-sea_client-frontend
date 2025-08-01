<script setup>
  import Button from '@/components/buttons/button.vue'

  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false,
    },
    imgUrl: {
      type: String,
      default: '圖片檔案位置',
    },
    actionLink: {
      type: String,
      default: '圖鑑連結',
    },
    title: {
      type: String,
      default: '生物名稱',
    },
  })
  const emit = defineEmits(['close', 'navigate'])
  const closePopup = () => {
    emit('close')
  }
  const goToLink = () => {
    emit('navigate', props.actionLink)
  }
</script>
<template>
  <div id="card" v-if="isVisible">
    <i class="fa-solid fa-x" id="btn_close" @click="closePopup"></i>
    <img :src="imgUrl" alt="生物圖片" />
    <div>
      <p v-html="title"></p>
      <Button variant="round" @click="goToLink"><i class="fa-solid fa-chevron-right"></i></Button>
    </div>
  </div>
</template>
<style scoped lang="scss">
  #card {
    position: absolute;
    top: 20px;
    left: 10px;
    width: auto;
    height: auto;
    max-width: 50vw;
    max-height: 410px;
    background-color: rgba(v.$color-blue-dark, 0.5);
    backdrop-filter: blur(10px);
    z-index: 1000;
    border-radius: v.$border-radius-md;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    #btn_close {
      align-self: flex-end;
      mix-blend-mode: difference;
      font-size: 20px;
      cursor: pointer;
      margin-bottom: -20px;
    }
    img {
      width: 160px;
      border-radius: v.$border-radius-md;
    }
    div {
      flex-grow: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      p {
        width: fit-content;
        text-wrap: balance;
        mix-blend-mode: difference;
        font-weight: bold;
      }
      button {
        aspect-ratio: 1/1;
      }
    }
  }
</style>
