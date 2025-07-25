<script setup>
    import { ref, computed } from 'vue';

    // 動態載入 assets/event 資料夾下所有 jpg、png
    const imageModules = import.meta.glob('@/assets/images/event/*.{jpg,png}', { eager: true, as: 'url' })

    const images = {}
    for (const path in imageModules) {
    const filename = path.split('/').pop()
    images[`/src/assets/images/event/${filename}`] = imageModules[path]
    }

    const categories = ref('全部活動');
    const events = ['全部活動', '實體行動', '教育推廣', '線上參與'];

    const allEvents = ref([
        { 
            id: 1, 
            title: '淨灘活動：用雙手還給海洋純淨', 
            filename: 'clean.jpg', 
            category: '實體行動',
            date: '2025.08.01',
            location: '福隆海水浴場',
            img: images['/src/assets/images/event/clean.jpg'],
            status: '已結束'
        },
        { 
            id: 2, 
            title: '教育講座：深度認識海洋', 
            filename: 'seminar.png', 
            category: '教育推廣',
            date: '2025.02.01',
            location: '台北市立圖書館',
            img: images['/src/assets/images/event/seminar.png'],
            status: '已結束'
        },
        { 
            id: 3, 
            title: '海底漫遊live：水下攝影即時導覽', 
            filename: 'live.jpg', 
            category: '線上參與',
            date: '2025.02.01',
            location: '',
            img: images['/src/assets/images/event/live.jpg'],
            status: '已結束'
        },
        { 
            id: 4, 
            title: '海上瑜珈&日出冥想', 
            filename: 'yoga.jpg', 
            category: '實體行動',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/yoga.jpg'],
            status: '已結束'
        },
        { 
            id: 5, 
            title: '海洋VR互動劇場', 
            filename: 'vr.jpg', 
            category: '教育推廣',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/vr.jpg'],
            status: '已結束'
        },
        { 
            id: 6, 
            title: '夜間潮間帶探索活動', 
            filename: 'night.jpg', 
            category: '實體行動',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/night.jpg'],
            status: '已結束'
        },
        { 
            id: 7, 
            title: '餐桌上的海洋：永續漁業探索', 
            filename: 'food.jpg', 
            category: '教育推廣',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/food.jpg'],
            status: '已結束'
        },
        { 
            id: 8, 
            title: '海的聲音：鯨豚聲音導聽工作坊', 
            filename: 'sound.jpg', 
            category: '線上參與',
            date: '2025.02.01',
            location: '',
            img: images['/src/assets/images/event/sound.jpg'],
            status: '已結束'
        },
        { 
            id: 9, 
            title: '微塑膠在哪裡？沙灘採樣與顯微觀察體驗', 
            filename: 'sand.png', 
            category: '實體行動',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/sand.png'],
            status: '已結束'
        },
        { 
            id: 10, 
            title: '打造你的海洋行動提案', 
            filename: 'discuss.png', 
            category: '實體行動',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/discuss.png'],
            status: '已結束'
        },
        { 
            id: 11, 
            title: '環保漁港導覽與清港行動', 
            filename: 'port.jpg', 
            category: '實體行動',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/port.jpg'],
            status: '已結束'
        },
        { 
            id: 12, 
            title: '海洋藝術創作工作坊', 
            filename: 'art.jpg', 
            category: '教育推廣',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/art.jpg'],
            status: '已結束'
        },
        { 
            id: 13, 
            title: '無塑海灘：社區淨灘與廢棄物記錄工作坊', 
            filename: 'rubbish.jpg', 
            category: '實體行動',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/rubbish.jpg'],
            status: '已結束'
        },
        { 
            id: 14, 
            title: '線上海洋講座：解謎深海', 
            filename: 'ocean.jpg', 
            category: '線上參與',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/ocean.jpg'],
            status: '已結束'
        },
        { 
            id: 15, 
            title: '海洋知識線上問答賽', 
            filename: 'quizz.jpg', 
            category: '線上參與',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/quizz.jpg'],
            status: '已結束'
        },
        { 
            id: 16, 
            title: '珊瑚復育志工體驗營', 
            filename: 'restoration.jpg', 
            category: '實體行動',
            date: '2025.02.01',
            location: '基隆外木山海岸',
            img: images['/src/assets/images/event/restoration.jpg'],
            status: '已結束'
        }
    ])

    //處理活動狀態

    
    // 篩選分類資料
    const filteredEvents = computed(() => {
        if (categories.value === '全部活動') {
            return allEvents.value
        }
        return allEvents.value.filter(event => event.category === categories.value)
    })
</script>

<template>
    <div class="event_hero">
        <h1 class="hero_title">活動</h1>
    </div>
    
    <div class="wrapper">
        <div class="tabs">
        <button
            v-for="item in events"
            :key="item"
            :class="{ active: categories.value === item }"
            @click="categories.value = item"
        >
            {{ item }}
        </button>
        </div>

        <div class="card_list">
            <router-link
                v-for="event in filteredEvents"
                :key="event.id"
                :to="{name: 'EventDetail', params: { id: event.id }}"
            >
                <div class="event_card">
                    <img class="event_pic" :src="event.img" :alt="event.title" />
                    <div class="card_content">
                        <div class="detail">
                            <span class="date">{{ event.date }}</span>
                            <span class="location">
                                <img src="/src/assets/images/event/location.svg" alt="locationIcon">
                                {{ event.location || 'zoom會議' }}
                            </span>
                        </div>
                        <p class="title">{{ event.title }}</p>
                        <span class="tag">{{ event.status }}</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>


<style lang="scss" scoped>
  @use '@/assets/style/variables' as *;
  @use '@/assets/style/mixins' as *;

    .wrapper {
    padding: 2rem;
    color: white;
    }
    .wrapper::before {
        @include bg-layer-fixed-dark;
    }

    .event_hero {
        background-image: url('/src/assets/images/event/eventBanner.jpg');
        background-size: cover;
        background-position: center;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .hero_title {
        color: white;
        font-size: $h1-desktop;
        font-family: $font-serif-tc;
    }
    .event_hero h1 {
        font-family: $font-serif-tc;
        font-size: $h1-desktop;
        font-weight: $font-bold;
        letter-spacing: $letter-spacing-wide;
        line-height: $line-height-normal;
        color: white;
        text-shadow: 0px 0px 3px #000;
        z-index: 100;
    }
    
    .card_list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;

        @media (max-width: 1024px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 480px) {
            grid-template-columns: 1fr;
        }
    }
    .event_card_link {
        display: block;
        max-width: 280px;
        width: 100%;
        height: 100%;
        transition: transform 0.2s ease-in-out
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    .event_card {
        background-color: #fff;
        color: $color-black;
        border-radius: $border-radius-md;
        height: 100%;
        border: $border-base solid $color-blue; 
        overflow: hidden;
        font-family: $font-sans;
        font-size: $sub-desktop;
        display: flex;
        flex-direction: column;

        &:hover {
            border-color: $color-orange;
        }
    }

    .card_content {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        flex: 1;
    }
    .title {
        font-size: $p-desktop;
    }
    .event_pic {
        width: 100%;
        max-height: 210px;
        object-fit: cover;
    }
    .detail {
        color: $color-orange;
        display: flex;
        justify-content: space-between;
    }
    .tag {
        color: $color-white;
        background-color: $color-gray;
        border-radius: $border-radius-sm;
        text-align: center;
        margin-top: auto;

        &.未開始{
            background-color: $color-yellow;
        }
        &.進行中{
            background-color: $color-orange;
        }
        &.已取消{
            background-color: $color-gray;
        }
    }
</style>