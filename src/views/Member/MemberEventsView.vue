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
      <div class="event_card" v-for="event in paginatedEvents" :key="event.id">
        <img :src="event.image" :alt="event.name" class="event_image" />
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
            <span class="label">時間:</span>
            {{ event.time }}
          </div>
          <div class="event_detail_item">
            <span class="label">集合地點:</span>
            {{ event.location }}
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

<script setup>
  import { ref, computed, watch } from 'vue'
  import PageNumber from '@/components/buttons/page_number.vue'
  import eventImage from '@/assets/images/member-system/beach.png'

  const selectedFilter = ref('registered')
  const currentPage = ref(1)
  const itemsPerPage = ref(3)

  const allEvents = ref([
    {
      id: 'evt001',
      name: '台北淨灘',
      date: '2025/07/25(五)',
      status: '已報名',
      time: '09:00 - 12:00',
      location: '台北市大安區某海灘',
      image: eventImage,
    },
    {
      id: 'evt002',
      name: '台中淨灘',
      date: '2025/08/15(五)',
      status: '已報名',
      time: '09:00 - 12:00',
      location: '台中市清水區某海灘',
      image: eventImage,
    },
    {
      id: 'evt003',
      name: '高雄珊瑚保育講座',
      date: '2025/09/01(一)',
      status: '已報名',
      time: '14:00 - 16:00',
      location: '高雄市海洋生物博物館',
      image: eventImage,
    },
    {
      id: 'evt004',
      name: '基隆淨灘',
      date: '2024/11/20(三)',
      status: '已完成',
      time: '09:00 - 12:00',
      location: '基隆市某海灘',
      image: eventImage,
    },
    {
      id: 'evt005',
      name: '海洋廢棄物藝術展',
      date: '2024/10/10(四)',
      status: '已完成',
      time: '10:00 - 18:00',
      location: '台北市華山文創園區',
      image: eventImage,
    },
    {
      id: 'evt006',
      name: '墾丁潛水淨海',
      date: '2024/09/05(五)',
      status: '已完成',
      time: '08:00 - 13:00',
      location: '屏東縣墾丁國家公園',
      image: eventImage,
    },
  ])

  const filteredEvents = computed(() => {
    currentPage.value = 1
    switch (selectedFilter.value) {
      case 'registered':
        return allEvents.value.filter((event) => event.status === '已報名')
      case 'completed':
        return allEvents.value.filter((event) => event.status === '已完成')
      case 'all':
      default:
        return allEvents.value
    }
  })

  const paginatedEvents = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredEvents.value.slice(start, end)
  })
</script>

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

  .event_image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: $border-radius-sm;
    flex-shrink: 0;
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
    .event_image {
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
