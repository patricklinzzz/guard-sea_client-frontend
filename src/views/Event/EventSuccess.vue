<script setup>
    import { useRouter } from 'vue-router';
    import Button from '@/components/buttons/button.vue';
    import { useRegStore } from '@/stores/event_reg';

    const props = defineProps(['id'])
    const router = useRouter()
    const form = useRegStore()

    // form.reset() //清空資料
</script>
<template>
    <body>
        <div class="wrapper">
            <h1>報名流程</h1>
            <div class="circle">
                <img src="@/assets/images/event/success_fff.svg" alt="icon_success" class="icon_success">
                <h2>您已報名成功</h2>
            </div>
            <div class="button_items">
                <Button class="event_member">已報名活動查詢</Button>
                <Button @click="router.back()" class="back">返回活動頁面</Button>
            </div>
        </div>
    </body>
</template>
<style lang="scss" scoped>
    .body {
        background-image: '@/assets/images/event/event_dec.png';
    }
    .circle {
        max-width: 270px;
        max-height: 270px;
        width: 100%;
        height: 100%;
        background-color: v.$color-blue;
        color: #fff;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-content: center;
    }
    .icon_success {
        max-width: 60px;
        max-height: 60px;
        width: 100%;
        height: 100%;
    }
    .button_items {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        @include respond(md){
            gap: 10px;
        }
    }
    .back {
        background-color: #E0E0E0;
        color: v.$color-black;
        &:hover {
            background-color: v.$color-gray;
        }
    }
</style>