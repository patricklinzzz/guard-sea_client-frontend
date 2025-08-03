<script setup>
    import { ref, computed } from 'vue'
    import DropdownFilter from '@/components/event/dropdown_filter.vue'
    import PageNumber from '@/components/buttons/page_number.vue'
    import { events_all } from '@/assets/data/event.js'

    //活動資料
    const events = ref(events_all)

    //頁碼
    const current_page = ref(1)
    const items_per_page = 12

    //分類活動
    const events_cat_all = ref('全部活動');
    const events_cat = ['全部活動', '實體行動', '教育推廣', '線上參與'];

    const status_filter = ref('全部');
    const statusOptions = ['全部', '報名中', '已截止'];

    // 篩選分類資料
    const filtered_events = computed(() => {
    return events.value
        .filter(event => {
        const matchCategory =
            events_cat_all.value === '全部活動' || event.category === events_cat_all.value;
        const matchStatus =
            status_filter.value === '全部' || event.status === status_filter.value;
        return matchCategory && matchStatus;
        })
        .sort((a, b) => {
        const dateA = new Date(a.date.replaceAll('.', '/'));
        const dateB = new Date(b.date.replaceAll('.', '/'));
        return dateB - dateA;
        });
    });

    const filter_items = computed(() => filtered_events.value)
    const show_per_page_items = computed(() => {
    const start = (current_page.value - 1) * items_per_page
    const end = start + items_per_page
    return filter_items.value.slice(start, end)
    })

    // 切換分類
    function change_cate(item) {
    events_cat_all.value = item
    current_page.value = 1
    }
</script>

<template>
    <div class="event_hero">
        <div class="hero_title">
            <h1>活動</h1>
        </div>
    </div>

    <div class="wrapper">
        <nav class="event_nav">
        <ul>
            <li v-for="item in events_cat" :key="item">
            <button
                :class="{ active: events_cat_all === item }"
                @click="() => change_cate(item)"
            >
                <h3>{{ item }}</h3>
            </button>
            </li>
        </ul>
        </nav>

        <div class="box">
            <DropdownFilter
                v-model="status_filter"
                :options="statusOptions"
                placeholder="請選擇活動狀態"
            />
        </div>

        <div class="card_list">
        <div 
            v-for="(item, index) in show_per_page_items"
            :key="item.id"
            class="event_card"
        >
            <router-link :to="{ name: 'EventDetail', params: { id: item.id } }" class="event_card_link">
            <div class="event_pic">
                <img :src="item.img" :alt="item.title" />
            </div>
            </router-link>

            <div class="card_content">
                <div class="detail">
                    <span class="date">{{ item.date }}</span>
                    <span class="tag" :class="item.status">{{ item.status }}</span>
                </div>

                <router-link :to="{ name: 'EventDetail', params: { id: item.id } }" class="event_card_link">
                    <p class="title">{{ item.title }}</p>
                </router-link>

                <span class="location">
                    <img src="@/assets/images/event/location.svg" alt="locationIcon">
                    {{ item.location }}
                </span>
            </div>
        </div>
        </div>
    </div>

    <nav>
        <PageNumber
        v-model="current_page"
        :total-items="filter_items.length"
        :items-per-page="items_per_page"
        class="my_pagination"
        />
    </nav>
</template>


<style lang="scss" scoped>

    .wrapper::before {
        @include bg-layer-fixed-dark;
    }

    .event_hero {
        background-image: url('@/assets/images/event/eventBanner.jpg');
        width: 100%;
        height: 300px;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        background-repeat: no-repeat;
        margin-bottom: 50px;

        @include respond(md) {
            height: 180px;
            background-position: 49% center;
            margin-bottom: 30px;
        }

        h1 {
            color: #fff;
            text-shadow: 0 4px 4px rgba(0, 0, 0, 0.7);
        }
    }
    
    .event_nav{
        max-width: v.$container;
        margin: 0 auto 40px auto;
        @include respond(md) {
            margin-bottom: 80px;
        }
        ul {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            
            @include respond(md) {
                flex-wrap: wrap;
                padding: 0px 20px;
                height: 38px;
                margin-bottom: 70px;
            }
        }

        li {
            position: relative;
            padding: 0px 10px;
            line-height: 40px;

            &::after {
                content: '';
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 1px;
                height: 24px;
                background-color: #fff;
            }
            &:last-child::after {
                display: none;
            }
            @include respond(md) {
                width: 50%;
                padding: 0px 15px;
                line-height: 38px;
                margin-bottom: 8px;

                &::after {
                    display: none;
                }

                &:nth-child(1)::after,
                &:nth-child(3)::after {
                    display: block;
                }
            }
        }
    }

    .box {
        max-width: 1040px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 40px;
        h1 {
            color: white;
        }
        @include respond(md) {
            margin: 40px 20px;
        }
    }

    button {
        width: 124px;
        line-height: 40px;
        border: none;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        @include respond(md) {
            width: 100%;
            line-height: 38px;
        }

        h3 {
            color: white;
            @include respond(md) {
            min-width: 114px;
            font-size: 22px;
            }
        }
        
        &.active {
            background-color: v.$color-skyblue-light;
            border-radius: 5px;

            h3 {
                color: v.$color-blue-dark;
            }
        }
    }


    .card_list {
        max-width: 1040px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;

        @include respond(md) {
            grid-template-columns: repeat(2, 1fr);
            margin: 20px;
            gap: 2rem 10px;
        }
    }
    .event_card_link {
        text-decoration: none;
        color: inherit;
    }
    .event_card {
        height: 100%;
        background-color: #fff;
        border: 3px solid v.$color-skyblue; 
        border-radius: v.$border-radius-md;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .event_pic {
        max-height: 210px;
        overflow: hidden;
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

    .card_content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 2% 4%;
        flex: 1;
        font-family: v.$font-sans;
        font-size: v.$sub-desktop;
        color: v.$color-black;

        @include respond(md) {
            padding: 3% 4%;
            font-size: v.$sub-mobile;
        }
    }
    .title {
        &:hover {
            color: v.$color-orange-active;
        }
    }
    .detail {
        display: flex;
        justify-content: space-between;

    }
    .tag {
        padding: 0 2%;
        text-align: center;
        font-size: v.$sub-mobile;
        border-radius: v.$border-radius-sm;

        color: v.$color-white;
        &.報名中 {
            background-color: v.$color-orange;
        }
        &.已截止 {
            background-color: v.$color-yellow;
        }
        &.已結束 {
            background-color: v.$color-gray;
        }
        &.已取消 {
            background-color: v.$color-blue;
        }
    }
    .location {
        margin-top: auto;
    }
</style>