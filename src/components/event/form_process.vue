<script setup>
import { computed } from 'vue';
import member from '@/assets/images/event/member.svg'
import member_fff from '@/assets/images/event/member_fff.svg'
import confirm from '@/assets/images/event/confirm.svg'
import confirm_fff from '@/assets/images/event/confirm_fff.svg'
import success from '@/assets/images/event/success.svg'
import success_fff from '@/assets/images/event/success_fff.svg'

    const props = defineProps({
        currentStep: {
            type: Number,
            default: 1
        }
    })

    //切換icon
    const memberIcon = computed(() => 
    props.currentStep >= 1 ? member_fff : member)
    const confirmIcon = computed(() => 
    props.currentStep >= 2 ? confirm_fff : confirm)
    const successIcon = computed(() => 
    props.currentStep >= 3 ? success_fff : success)
</script>

<template>
        <h1>報名流程</h1>
        <section class="process">
        <div :class="['step', { active: currentStep >= 1, current: currentStep === 1 }]">
            <img :src="memberIcon" 
            alt="icon_member" class="icon" />
            <p>填寫資料</p>
        </div>

        <div :class="['line', { filled: currentStep > 1 }]"></div>

        <div :class="['step', { active: currentStep >= 2, current: currentStep === 2 }]">
            <img :src="confirmIcon" 
            alt="icon_confirm" class="icon" />
            <p>確認資料</p>
        </div>

        <div :class="['line', { filled: currentStep > 2 }]"></div>

        <div :class="['step', { active: currentStep === 3, current: currentStep === 3 }]">
            <img :src="successIcon" alt="icon_success" class="icon" />
            <p>報名成功</p>
        </div>
        </section>
</template>

<style lang="scss" scoped>
    h1 {
        text-align: center;
    }
    .process {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        text-align: center;
    }

    .step {
        opacity: 0.5;
        transition: all 0.3s ease;

        &.active {
            opacity: 1;

            .icon {
                color: #fff;
                background-color: v.$color-blue;
            }
        }

        .icon {
            width: 70px;
            height: 70px;
            padding: 15px;
            color: v.$color-black;
            background-color: v.$color-skyblue-light;
            transition: background-color 0.3s ease;
            border-radius: v.$border-radius-md;
    
            @include respond(md) {
                width: 60%;
                height: 60%;
                padding: 10px;
            }
        }
    }

    .line {
        height: 3px;
        flex: 1;
        margin: 0 8px;
        background-color: v.$color-gray;
        transition: background-color 0.4s ease;

        &.filled {
            background-color: v.$color-blue;
        }
    }
</style>