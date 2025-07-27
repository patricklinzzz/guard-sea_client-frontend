<script setup>
    import { ref, onMounted, computed} from 'vue'
    import Button from '@/components/buttons/button.vue'
    import { useRouter } from 'vue-router';

    // 從單一數據源導入所有活動數據
    import { events_all } from '@/assets/data/event.js';
    const router = useRouter();

    // 接收路由傳來的活動 ID
    const props = defineProps({
        id: {
            type: [String, Number],
            required: true
        }
    });
    
    // 根據 ID 查找對應的活動資料
    const current_event = computed(() => {
        const found_event = events_all.find(event => event.id === parseInt(props.id));

        if (!found_event) {
            // 如果找不到活動，導航回活動列表頁，並可以在這裡給出提示
            alert('找不到該活動的詳細資訊！'); // 簡單提示
            router.push({ name: 'EventList' }); // 假設你的列表頁路由名稱是 EventList
            return null;
        }
        return found_event;
    });

    //返回列表
    const go_back = () => {
        router.back()
    }
</script>

<template>
<body>
    <div class="detail_pic">
        <img :src="current_event.bannerImage" alt="current_event.title">
    </div>

    <section class="event_info">
        <h1>{{ current_event.title }}</h1>
        <div class="desc">
            <div class="time">
                <img src="@/assets/images/event/time.svg" alt="icon_time">
                <h3>{{ current_event.dateTime }}</h3>
                <Button>立即報名</Button>
            </div>
            <div class="location">
                <img src="@/assets/images/event/location.svg" alt="icon_location">
                <h3 v-if="current_event.mapUrl">
                    <a :href="current_event.mapUrl" target="_blank" rel="noopener noreferrer">
                        {{ current_event.location }}
                    </a>
                </h3>
                <h3 v-else>
                    {{ current_event.location }}
                </h3>
            </div>
            <div class="people">
                <img src="@/assets/images/event/people.svg" alt="icon_people">
                <h3>主講人： {{ current_event.speaker}}</h3>
            </div>
        </div>
    </section>

    <section class="wrapper">
        <div class="intro">
            <h3>活動介紹</h3>
            <div class="content-html" v-html="current_event.introductionHtml"></div>
        </div>
        <div class="content">
            <h3>活動內容</h3>
            <div class="content-html"
        v-html="current_event.contentHtml"></div>
        </div>
    </section>

    <section class="registration_info">
        <h3>報名資訊</h3>
        <ul>
            <li><p>截止日期：{{ current_event.deadline }}</p></li>
            <li><p>{{ current_event.registrationSpots }}</p></li>
        </ul>
    </section>
    <Button @click="go_back"
    class="go_back">返回活動列表</Button>
</body>
</template>

<style lang="scss" scoped>
    .detail_pic {
        max-width: 1040px;
        aspect-ratio: 40 / 11;
        overflow: hidden;
        margin: 30px auto;
        border-radius: v.$border-radius-md;

        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50% 75%;
            display: block;
        }
    }

    .event_info,
    .wrapper,
    .registration_info {
        max-width: 1040px;
        margin: 0 auto;
        padding: 40px;
        border-bottom: v.$border-hairline solid v.$color-orange;
        h1 {
            margin-bottom: 30px;
        }
        h3 {
            font-weight: v.$font-bold;
            margin-bottom: 15px;
        }
        .intro {
            margin-bottom: 30px;
        }
        ul {
            list-style-type: disc;
            margin-left: 3%;
        }
    }
    .registration_info {
        border-bottom: none;
    }
    .content-html {
        ul p {
            list-style-type: disc;
            margin-left: 3%;
        }
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
    
    .go_back {
        display: flex;
        margin: 40px auto;
    }
</style>