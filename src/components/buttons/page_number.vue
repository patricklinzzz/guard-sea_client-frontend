<script setup>
  import { computed, watch } from 'vue'

  const props = defineProps({
    totalItems: Number, // 總資料筆數
    itemsPerPage: Number, // 每頁顯示幾筆
    modelValue: Number, // 現在第幾頁
  })

  const emit = defineEmits(['update:modelValue'])

  const totalPages = computed(() => {
    return Math.ceil(props.totalItems / props.itemsPerPage)
  })

  function getDisplayPages() {
    const pages = []
    const current = props.modelValue

    if (totalPages.value <= 3) {
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      if (current === 1) {
        pages.push(1, 2, 3)
      } else if (current === totalPages.value) {
        pages.push(totalPages.value - 2, totalPages.value - 1, totalPages.value)
      } else {
        pages.push(current - 1, current, current + 1)
      }
    }

    return pages
  }

  function setPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      emit('update:modelValue', page)
    }
  }

  watch(
    () => props.totalItems,
    () => {
      if (props.modelValue > totalPages.value) {
        emit('update:modelValue', 1)
      }
    }
  )
</script>

<template>
  <nav class="pagination">
    <button @click="setPage(modelValue - 1)" :disabled="modelValue === 1" class="arrow">
      <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 15L1 8L8 1"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <ul>
      <li v-for="page in getDisplayPages()" :key="page">
        <button :class="{ active: page === modelValue }" @click="setPage(page)">
          {{ page }}
        </button>
      </li>
    </ul>

    <button @click="setPage(modelValue + 1)" :disabled="modelValue === totalPages" class="arrow">
      <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.999999 1L8 8L1 15"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </nav>
</template>

<style scoped lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 32px;

    ul {
      display: flex;
      gap: 20px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    button {
      width: 39px;
      height: 39px;
      background-color: transparent;
      border: 2px solid #ffffff;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      font-size: 16px;
      margin-bottom: 25px;
    }

    .arrow {
      border: none;
    }

    button.active {
      background: #ffffff;
      color: black;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      color: #a6a6a6;
    }
  }

  //客製化頁碼_給其他頁面參考_如果引入此頁碼組件 但想要在自己分頁改其他樣式顏色可以參考以下作法放在自己頁面start

  // :deep(.my_pagination button) {
  //   border-color: #00bcd4;
  //   color: #00bcd4;
  // }

  // :deep(.my_pagination button.active) {
  //   background-color: #00bcd4;
  //   color: white;
  // }

  // :deep(.my_pagination button:disabled) {
  //   opacity: 0.4;
  //   color: #aaa;
  // }

  // :deep(.my_pagination .arrow svg path) {
  //   stroke: #00bcd4;
  // }

  // :deep(.my_pagination button:disabled svg path) {
  //   stroke: #ccc;
  // }

  //客製化頁碼_給其他頁面參考_end
</style>
