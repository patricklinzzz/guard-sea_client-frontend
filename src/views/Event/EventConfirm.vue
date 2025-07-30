<script setup>
    import { useRouter } from 'vue-router';
    import { useRegStore } from '@/stores/event_reg';
    import Button from '@/components/buttons/button.vue'

    const props = defineProps(['id'])
    const router = useRouter()
    const form = useRegStore()

    const submit = () => {
        router.push(`/event/reg_success/${props.id}`)
    }
</script>
<template>
    <div class="wrapper">
        <h1>報名流程</h1>
        <h3>活動資訊</h3>
        <ul>
            <li>活動名稱：</li>
            <li>活動時間：</li>
            <li>活動地點：</li>
        </ul>
        <h3>參加者資訊</h3>
        <div>
            <p>姓名：{{ form.formData.name }}</p>
            <p>電話：{{ form.formData.phone }}</p>
            <p>Email：{{ form.formData.email }}</p>
            <p>緊急聯絡人：{{ form.formData.current_person }}</p>
            <p>緊急連絡人電話：{{ form.formData.current_phone }}</p>
            <p>備註：{{ form.formData.note }}</p>
        </div>
    </div>

    <Button @click="submit">確認報名</Button>
    <Button @click="router.back()">返回修改</Button>
</template>
<style></style>