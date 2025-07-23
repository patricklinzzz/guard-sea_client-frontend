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
            title: '淨灘活動', 
            filename: 'clean.jpg', 
            category: '實體行動',
            date: '2025.02.01',
            img: images['/src/assets/images/event/clean.jpg']
        },
        { 
            id: 2, 
            title: '教育講座', 
            filename: 'seminar.jpg', 
            category: '教育推廣',
            date: '2025.02.01',
            img: images['/src/assets/images/event/seminar.jpg']
        }
    ])

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
        <img src="/src/assets/images/event/eventBanner.jpg" alt="eventBanner" />
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

        <div class="card-grid">
        <div v-for="event in filteredEvents" :key="event.id" class="card">
            <img :src="event.img" :alt="event.title" />
            <div class="card-content">
            <p class="date">{{ event.date }}</p>
            <h3 class="title">{{ event.title }}</h3>
            <span class="tag">{{ event.category }}</span>
            </div>
        </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .wrapper {
    padding: 2rem;
    color: white;
    }
    .wrapper::before {
        @include bg-layer-fixed-dark;
    }
    .event_hero img {
        display: block;
        max-width: 100%;
        width: 100%;
        max-width: 1920px;
        margin: 0 auto;
        height: auto;
        object-fit: cover;
    }
</style>