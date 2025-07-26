<script setup>
    import { ref, onMounted, computed } from 'vue'
    import PageNumber from '@/components/buttons/page_number.vue'

    const current_page = ref(1)
    const items_per_page = 12

    //show_per_page_items
    const filter_items = computed(() => filtered_events.value)
    const show_per_page_items = computed(() => {
        const start = (current_page.value - 1) * items_per_page

        const end = start + items_per_page

        return filter_items.value.slice(start, end)
    })

    //活動資料（可用 API 或 props 傳進來）
    const events_all = [
        {
            id: 1,
            title: '淨灘活動：用雙手還給海洋純淨',
            img: 'clean.jpg',
            category: '實體行動',
            date: '2025.09.10',
            location: '福隆海水浴場',
            status: '進行中'
        },
        {
            id: 2,
            title: '教育講座：深度認識海洋',
            img: 'seminar.png',
            category: '教育推廣',
            date: '2025.11.20',
            location: '台北市立圖書館',
            status: '未開始'
        },
        { 
            id: 3,
            title: '海底漫遊live：水下攝影即時導覽',
            img: 'live.jpg',
            category: '線上參與',
            date: '2025.01.30',
            location: '',
            status: '已結束'
        },
        { 
            id: 4, 
            title: '海上瑜珈&日出冥想', 
            img: 'yoga.jpg', 
            category: '實體行動',
            date: '2025.08.30',
            location: '基隆外木山海岸',
            status: '已取消'
        },
        { 
            id: 5, 
            title: '海洋VR互動劇場', 
            img: 'vr.jpg', 
            category: '教育推廣',
            date: '2025.08.01',
            location: '基隆外木山海岸',
            status: '進行中'
        },
        { 
            id: 6, 
            title: '夜間潮間帶探索活動', 
            img: 'night.jpg', 
            category: '實體行動',
            date: '2025.09.10',
            location: '基隆外木山海岸',
            status: '進行中'
        },
        { 
            id: 7, 
            title: '餐桌上的海洋：永續漁業探索', 
            img: 'food.jpg', 
            category: '教育推廣',
            date: '2025.11.01',
            location: '基隆外木山海岸',
            status: '未開始'
        },
        { 
            id: 8, 
            title: '海的聲音：鯨豚聲音導聽工作坊', 
            img: 'sound.jpg', 
            category: '線上參與',
            date: '2025.12.27',
            location: '',
            status: '未開始'
        },
        { 
            id: 9, 
            title: '微塑膠在哪裡？沙灘採樣與顯微觀察體驗', 
            img: 'sand.png', 
            category: '實體行動',
            date: '2025.12.01',
            location: '基隆外木山海岸',
            status: '未開始'
        },
        { 
            id: 10, 
            title: '打造你的海洋行動提案', 
            img: 'discuss.png', 
            category: '實體行動',
            date: '2025.10.01',
            location: '基隆外木山海岸',
            status: '未開始'
        },
        { 
            id: 11, 
            title: '環保漁港導覽與清港行動', 
            img: 'port.jpg', 
            category: '實體行動',
            date: '2025.10.21',
            location: '基隆外木山海岸',
            status: '未開始'
        },
        { 
            id: 12, 
            title: '海洋藝術創作工作坊', 
            img: 'art.jpg', 
            category: '教育推廣',
            date: '2025.11.11',
            location: '基隆外木山海岸',
            status: '未開始'
        },
        { 
            id: 13, 
            title: '無塑海灘：社區淨灘與廢棄物記錄工作坊', 
            img: 'rubbish.jpg', 
            category: '實體行動',
            date: '2025.11.10',
            location: '基隆外木山海岸',
            status: '未開始'
        },
        { 
            id: 14, 
            title: '線上海洋講座：解謎深海', 
            img: 'ocean.jpg', 
            category: '線上參與',
            date: '2025.10.11',
            location: '',
            status: '未開始'
        },
        { 
            id: 15, 
            title: '海洋知識線上問答賽', 
            img: 'quizz.jpg', 
            category: '線上參與',
            date: '2025.02.01',
            location: '',
            status: '已結束'
        },
        { 
            id: 16, 
            title: '珊瑚復育志工體驗營', 
            img: 'restoration.jpg', 
            category: '實體行動',
            date: '2025.03.01',
            location: '基隆外木山海岸',
            status: '已結束'
        }
    ]
    const events = ref([])

    // 匯入圖片，改用 query
    const image_modules = import.meta.glob('@/assets/images/event/*.{jpg,png}', {
    query: '?url',
    import: 'default'
    })

    onMounted(async () => {
    // 載入圖片 map，格式為 { 'clean.jpg': '真實圖片 URL' }
    const image_map = {}
    for (const path in image_modules) {
        const file_name = path.split('/').pop()
        const image_url = await image_modules[path]()
        image_map[file_name] = image_url
    }

    // 整合圖片 URL 到活動資料中
    events.value = events_all.map(event => ({
        ...event,
        img: image_map[event.img] || ''  // 加上預設值防止錯誤
    }))
    })

    const h1_title = ref('所有活動'); // 預設標題

    //分類活動
    const events_cat_all = ref('全部活動');
    const events_cat = ['全部活動', '實體行動', '教育推廣', '線上參與'];

    const status_filter = ref('全部');
    const showDropdown = ref(false);

    const statusOptions = ['全部', '未開始', '進行中', '已結束', '已取消'];

    //時間排序
    const sort_order = ref('asc');

    // 篩選分類資料
    const filtered_events = computed(() => {
    return events.value
        .filter(event => {
        const matchCategory =
            events_cat_all.value === '全部活動' ||
            event.category === events_cat_all.value;
        const matchStatus =
            status_filter.value === '全部' || event.status === status_filter.value;

        return matchCategory && matchStatus;
        })
        .sort((a, b) => {
        const dateA = new Date(a.date.replaceAll('.', '/'));
        const dateB = new Date(b.date.replaceAll('.', '/'));
        return dateB - dateA; // 固定從新到舊
        });
    });

    // 根據分類更新 H1 標題
    function change_cate(item) {
        h1_title.value = item
        events_cat_all.value = item
        current_page.value = 1
    }
</script>

<template>
<body>

<div class="event_hero"></div>

<div class="wrapper">
    <nav class="event_nav">
        <ul>
            <li v-for="item in events_cat"
            :key="item">
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
        <h1>{{ h1_title }}</h1>
        <div class="status_filter">
            <div class="dropdown_wrapper" @click="showDropdown = !showDropdown">
                <input
                type="text"
                readonly
                :value="status_filter"
                placeholder="請選擇活動狀態"
                />
                <span class="arrow">▼</span>
            </div>
            <ul v-if="showDropdown" class="dropdown_list">
                <li
                v-for="option in statusOptions"
                :key="option"
                @click="() => { status_filter = option; showDropdown = false; }"
                >
                {{ option }}
                </li>
            </ul>
        </div>
    </div>

    <div class="card_list">
        <div 
            v-for="(item, index) in show_per_page_items"
            :key="item.id"
            :class="{
                reverse: index % 2 === 1,
            }"
            class="event_card"
        >
            <router-link :to="{ name: 'EventDetail', params: { id: item.id } }"
            class="event_card_link">
            <div class="event_pic">
                <img :src="item.img" :alt="item.title" />
            </div>
            </router-link>

            <div class="card_content">
                <span class="date">{{ item.date }}</span>

                <router-link :to="{ name: 'EventDetail', params: { id: item.id } }"
                class="event_card_link">
                    <p class="title">{{ item.title }}</p>
                </router-link>

                <div class="detail">
                    <span class="location">
                    <img src="@/assets/images/event/location.svg" alt="locationIcon">
                    {{ item.location || 'zoom會議' }}
                    </span>

                    <router-link :to="{ name: 'EventDetail', params: { id: item.id } }"
                    class="event_card_link">
                        <span class="tag" :class="item.status"># {{ item.status }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 分頁按鈕區 -->
    <nav>
        <PageNumber
            v-model="current_page"
            :total-items="filter_items.length"
            :items-per-page="items_per_page"
            class="my_pagination"
        />
    </nav>
</body>
</template>



<style lang="scss" scoped>

    .wrapper::before {
        @include bg-layer-fixed-dark;
    }

    .event_hero {
        background-image: url('@/assets/images/event/eventBanner.jpg');
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 300px;
        margin-bottom: 50px;

        @include respond(md) {
            height: 180px;
            background-position: 49% center;
            margin-bottom: 30px;
        }
    }
    
    .event_nav{
        max-width: v.$container;
        margin: 0 auto 40px auto;

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
        justify-content: space-between;
        margin-bottom: 40px;
        h1 {
            color: white;
        }
        @include respond(md) {
            margin: 40px 20px;
        }
    }

    .status_filter {
        position: relative;
        width: 160px;

        .dropdown_wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 6px 12px;
            border: 2px solid v.$color-skyblue;
            border-radius: 6px;
            background-color: white;
            cursor: pointer;
        }

        input {
            font-size: v.$sub-desktop;
            border: none;
            background: none;
            outline: none;
            width: 100%;
            cursor: pointer;
            @include respond(md) {
                font-size: v.$sub-mobile;
            }
        }

        .arrow {
            margin-left: 8px;
            color: v.$color-blue-dark;
        }

        .dropdown_list {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border-radius: 6px;
            font-size: v.$sub-desktop;
            // max-height: 200px;
            // overflow-y: auto;
            overflow: hidden;
            z-index: 10;
            li {
                padding: 10px 12px;
                cursor: pointer;
                transition: 0.2s;
                &:hover {
                    background-color: v.$color-skyblue-light;
                }
            }

            @include respond(md) {
                font-size: v.$sub-mobile;
            }
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
        margin-top: auto;

        @include respond(md) {
            flex-direction: column;
        }
    }
    .tag {
        border-radius: v.$border-radius-sm;
        text-align: center;
        padding: 0.2rem 0.6rem;

        color: v.$color-white;
        &.進行中 {
            background-color: v.$color-orange;
        }
        &.未開始 {
            background-color: v.$color-yellow;
        }
        &.已結束 {
            background-color: v.$color-gray;
        }
        &.已取消 {
            background-color: v.$color-blue;
        }
    }

    //客製化頁碼
    :deep(.my_pagination button) {
        border-color: #00bcd4;
        color: #00bcd4;
    }

    :deep(.my_pagination button.active) {
        background-color: #00bcd4;
        color: white;
    }

    :deep(.my_pagination button:disabled) {
        opacity: 0.4;
        color: #aaa;
    }

    :deep(.my_pagination .arrow svg path) {
        stroke: #00bcd4;
    }

    :deep(.my_pagination button:disabled svg path) {
        stroke: #ccc;
    }
</style>