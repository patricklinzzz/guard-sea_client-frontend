<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import PageNumber from '@/components/buttons/page_number.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const allEvents = ref([])
const isLoading = ref(true)
const error = ref(null)
const selectedFilter = ref('registered')
const currentPage = ref(1)
const itemsPerPage = ref(3)

// API URL
const apiUrl = `${import.meta.env.VITE_API_BASE}/members/get_member_events.php`

// 基底圖片網址處理
const baseImageUrl = import.meta.env.VITE_API_BASE || ''
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  return `${baseImageUrl}${imagePath}`
}

// 取活動資料
const fetchEvents = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await axios.get(apiUrl, { withCredentials: true })

    // 後端直接回傳陣列
    allEvents.value = response.data.map(event => ({
      id: event.id,      // 對應 reg_id
      activity_id: event.activity_id,
      name: event.name,      // 對應 title
      image: event.image,
      date: event.date,      // 活動日期合併
      location: event.location,
      status: event.status   // 已報名 / 已完成
    }))
  } catch (err) {
    console.error('無法獲取活動資料:', err)
    error.value = '讀取活動失敗，請稍後再試或聯繫客服。'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchEvents)

// 篩選
const filteredEvents = computed(() => {
  switch (selectedFilter.value) {
    case 'registered':
      return allEvents.value.filter((e) => e.status === '已報名')
    case 'completed':
      return allEvents.value.filter((e) => e.status === '已完成')
    case 'all':
    default:
      return allEvents.value
  }
})

// 分頁
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredEvents.value.slice(start, end)
})

watch(selectedFilter, () => {
  currentPage.value = 1
})
</script>

<template>
  <main class="event_content_area">
    <div class="event_content_header">
      <h1>會員專區</h1>
    </div>

    <div class="event_filter_section">
      <h3>活動查詢</h3>
      <form class="event_status_filter">
        <select v-model="selectedFilter">
          <option value="registered">已報名的活動</option>
          <option value="all">所有活動紀錄</option>
          <option value="completed">已完成的活動</option>
        </select>
      </form>
    </div>

    <div class="event_list">
      <div v-if="isLoading">載入中...</div>
      <div v-else-if="error" class="status-message error">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="paginatedEvents.length === 0">目前沒有活動紀錄</div>

      <div v-else>
        <div class="event_card" v-for="event in paginatedEvents" :key="event.id">
          <router-link :to="{ name: 'EventDetail', params: { id: event.activity_id } }" class="event_card_link">
            <div class="event_pic">
              <img :src="getImageUrl(event.image)" :alt="event.name" class="event_image" />
            </div>
          </router-link>

          <div class="event_details">
            <h3 class="event_detail_item name">{{ event.name }}</h3>
            <div class="event_detail_item">
              <span class="label">活動日期:</span>
              {{ event.date }}
            </div>
            <div class="event_detail_item">
              <span class="label">狀態:</span>
              {{ event.status }}
            </div>
            <div class="event_detail_item">
              <span class="label">集合地點:</span>
              {{ event.location }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <PageNumber
      class="my_pagination"
      v-if="filteredEvents.length > 0"
      :total-items="filteredEvents.length"
      :items-per-page="itemsPerPage"
      v-model="currentPage"
    />
  </main>
</template>

<style scoped lang="scss">
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;

  .event_content_area {
    flex-grow: 1;
    background-color: $color-bg-light;
    border-radius: $border-radius-md;
    padding: 20px 40px 40px;
  }
  .event_content_header {
    border-bottom: $border-hairline solid $border-color-gray;
    padding-bottom: 20px;
    margin-bottom: 20px;
    h1 {
      text-align: center;
      color: $color-text-main;
    }
  }
  .event_filter_section {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    h3 {
      width: 100%;
      text-align: center;
      color: $color-text-main;
    }
    .event_status_filter {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      select {
        height: $input-height-desktop;
        padding: 0 40px 0 15px;
        border: $border-base solid $border-color-gray;
        border-radius: $border-radius-sm;
        background-color: $color-white;
        font-size: $p-desktop;
        color: $color-text-main;
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23333333' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 15px center;
      }
    }
  }

  .event_card {
    display: flex;
    gap: 20px;
    align-items: center;
    background-color: $color-white;
    border-radius: $border-radius-md;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: $shadow-sm;
  }
  
  .event_card_link {
    text-decoration: none;
    color: inherit;
  }

  .event_pic {
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: $border-radius-sm;
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease-in-out;
    }

    &:hover img {
      transform: scale(1.05);
      filter: brightness(0.95);
    }
  }

  .event_details {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .name {
      color: $color-primary;
      margin-bottom: 4px;
    }

    .event_detail_item {
      font-size: $sub-desktop;
      color: $color-text-main;
    }

    .label {
      color: $color-text-sub;
    }
  }
  @include respond(md) {
    .event_content_area {
      width: 100%;
      padding: 20px;
      border-radius: $border-radius-md;
    }

    .event_filter_section {
      flex-direction: column;
      align-items: center;
      gap: 10px;
      .event_status_filter {
        position: static;
        transform: none;
        width: 100%;
        select {
          width: 100%;
          height: $input-height-mobile;
          font-size: $p-mobile;
        }
      }
    }
    .event_card {
      padding: 15px;
      align-items: flex-start;
    }
    .event_pic {
      width: 80px;
      height: 80px;
    }
    .event_details {
      gap: 5px;
      .event_detail_item {
        font-size: $sub-mobile;
      }
    }
  }

  :deep(.my_pagination button) {
    background-color: $color-white;
    border: $border-base solid $border-color-gray;
    color: $color-text-main;
    font-weight: $font-bold;
    transition: all 0.3s;

    &:not(.active):not(:disabled):hover {
      background-color: $color-gray-light;
      border-color: $color-skyblue;
    }
  }

  :deep(.my_pagination button.active) {
    background-color: $color-yellow;
    border-color: $color-yellow;
    color: $color-text-white;

    &:hover {
      background-color: $color-yellow-hover;
      border-color: $color-yellow-hover;
    }
  }

  :deep(.my_pagination .arrow) {
    border: none !important;
    background-color: transparent !important;
  }

  :deep(.my_pagination .arrow svg path) {
    stroke: $color-black;
  }

  :deep(.my_pagination button:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: $color-white;
    border-color: $border-color-gray;

    &.arrow svg path {
      stroke: $color-gray;
    }
  }
</style>