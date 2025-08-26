<script setup>
import { computed, onMounted } from 'vue'
import Button from '@/components/buttons/button.vue'
import { useRouter, useRoute } from 'vue-router'
import { useEventStore } from '@/stores/event_store'
import { formatEventDates } from '@/utils/dateFormat'

// 連結按鈕報名表單
const route = useRoute()
// 確保 eventId 是一個數字
const eventId = parseInt(route.params.id)
const router = useRouter()

// 導入所有活動數據
const eventStore = useEventStore()

// 根據 ID 查找對應的活動資料，使用 store 的 getter
const current_event = computed(() => eventStore.getEventById(eventId))

// 確保在元件載入時呼叫 API
onMounted(() => {
    // 只有在 store 中沒有資料時才呼叫 API
    eventStore.fetchEvents().then(() => {
        // 在資料載入後，如果還是找不到對應活動，再執行導航
        if (!current_event.value) {
            router.push({ name: 'EventList' })
        }
    })
})

// 轉換日期格式
const eventDates = computed(() => {
    if (!current_event.value) return {}
    return formatEventDates(current_event.value)
})

const buttonInfo = computed(() => {
    const status = current_event.value?.status
    switch (status) {
        case '報名中':
            return { text: '立即報名', class: 'status-open' }
        case '已截止':
            return { text: '報名已截止', class: 'status-closed' }
        case '已取消':
            return { text: '活動已取消', class: 'status-cancelled' }
        case '已結束':
            return { text: '活動已結束', class: 'status-ended' }
        default:
            return { text: '狀態未知', class: '' }
    }
})

const isButtonDisabled = computed(() => {
    if (!current_event.value) return true // 數據未載入時禁用

    const status = current_event.value.status
    return status === '已截止' || status === '已取消' || status === '已結束'
})

// 返回列表
const go_back = () => {
    router.back()
}
</script>

<template>
    <div v-if="current_event">
        <div class="detail_pic">
            <img :src="current_event.main_image" :alt="current_event.title">
        </div>

        <section class="event_info">
            <h1>{{ current_event.title }}</h1>
            <component
                :is="isButtonDisabled ? 'div' : 'RouterLink'"
                :to="!isButtonDisabled ? `/event/reg/${current_event.activity_id}` : null"
                >
                <Button
                    :disabled="isButtonDisabled"
                    :class="[buttonInfo.class, 'button_inline']"
                >
                    {{ buttonInfo.text }}
                </Button>
            </component>

            <div class="desc">
                <div class="time">
                    <img src="@/assets/images/event/time.svg" alt="icon_time">
                    <h3>{{ eventDates.dateTime }}</h3>
                </div>
                <div class="location">
                    <img src="@/assets/images/event/location.svg" alt="icon_location">
                    <h3 v-if="current_event.mapUrl">
                        {{ current_event.location }}
                        <p><a :href="current_event.mapUrl" target="_blank" rel="noopener noreferrer">
                            <i class="fa-solid fa-location-arrow"></i>
                            搜尋地圖
                        </a></p>
                    </h3>
                    <h3 v-else>
                        {{ current_event.location }}
                    </h3>
                </div>
                <div class="people">
                    <img src="@/assets/images/event/people.svg" alt="icon_people">
                    <h3>主講人： {{ current_event.presenter}}</h3>
                </div>
            </div>
        </section>

        <section class="wrapper">
            <div class="intro">
                <h3>活動介紹</h3>
                <div class="content-html" v-html="current_event.preface"></div>
            </div>
            <div class="content">
                <h3>活動內容</h3>
                <ul class="content-html">
                    <li v-for="(line, i) in current_event.description.split('\n').filter(l => l.trim())" :key="i">
                    {{ line }}
                    </li>
                </ul>
            </div>
        </section>

        <section class="registration_info">
            <h3>報名資訊</h3>
            <ul>
                <li><p>截止日期：{{ eventDates.deadline }}</p></li>
                <li><p>{{ current_event.notes }}</p></li>
            </ul>
        </section>
        <Button @click="go_back" class="go_back">返回活動列表</Button>
    </div>
    <div v-else class="loading-message">
        <p>資料載入中，請稍候...</p>
    </div>
</template>

<style lang="scss" scoped>
    .detail_pic {
        max-width: 1040px;
        width: 100%;
        aspect-ratio: 40 / 11;
        overflow: hidden;
        margin: 30px auto 0;
        border-radius: v.$border-radius-md;

        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50% 75%;
            display: block;
        }

        @include respond(md) {
            width: 90%;
        }
    }

    .event_info,
    .wrapper,
    .registration_info {
        max-width: 1040px;
        margin: 0 auto;
        padding: 40px;
        border-bottom: v.$border-hairline solid v.$color-orange;
        display: flex;
        flex-direction: column;
        gap: 30px;
        h3 {
            font-weight: v.$font-bold;
        }
        ul {
            list-style-type: disc;
            padding-left: 1.5rem;
            & li {
                margin-bottom: 0.2rem;
            }
        }

        @include respond(md) {
            width: 90%;
            margin: 0 auto;
            padding: 20px;
            gap: 20px;
        }
    }
    .registration_info {
        border-bottom: none;
    }

    .button_inline {
        display: inline-block;
        align-self: flex-start;
    }
    :deep(.status-open) {
        background-color: v.$color-orange;
    }
    :deep(.status-closed) {
        background-color: v.$color-yellow;
        pointer-events: none;
        cursor: not-allowed;
    }
    :deep(.status-cancelled),
    :deep(.status-ended) {
        background-color: v.$color-gray;
        pointer-events: none;
        cursor: not-allowed;
    }

    .desc {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .time,
        .location,
        .people {
            display: flex;
            gap: 15px;
            align-items: center;
            h3 {
                margin-bottom: 0;
            }
        }
        .location{
            h3 {
                display: flex;
                flex-direction: row;
                gap: 15px;
                align-items: center;
            }
            a {
                text-decoration: none;
                color: v.$color-orange;
            }
            img {
                width: 32px;
                height: 32px;
            }
        }
    }

    .content-html{
        margin-top: 20px;
        @include respond(md){
            margin-top: 10px;
        }
    }

    .go_back {
        display: flex;
        margin: 40px auto;
    }

    .loading-message {
        text-align: center;
        padding: 50px;
        font-size: 1.2rem;
        color: #fff;
    }
</style>