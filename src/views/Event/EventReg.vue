<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRegStore } from '@/stores/event_reg'
import { events_all } from '@/assets/data/event'

import { validatePhone, validateOptionalPhone, validateEmail } from '@/utils/validators.js'

import AnimatedAnimal from '@/components/event/AnimatedAnimal.vue'
import turtle from '@/assets/images/dec/seaturtle.svg'

import form_process from '@/components/event/form_process.vue'
import Button from '@/components/buttons/button.vue'

const router = useRouter()
const store = useRegStore()

const currentStep = ref(1)

const event = ref(null)

const phone_error = ref('')
const contact_phone_error = ref('')
const email_error = ref('')

// 驗證邏輯
const phone_true = () => {
    phone_error.value = validatePhone(store.formData.phone)
}
const contact_phone_true = () => {
    contact_phone_error.value = validateOptionalPhone(store.formData.contact_phone)
}
const email_true = () => {
    email_error.value = validateEmail(store.formData.email)
}

//讀取資料
    const props = defineProps({
        id: {
            type: [String, Number],
            required: true
        }
    });
    onMounted (()=> {
        const found = events_all.find(e => String(e.id) === String(props.id))
        if (found) event.value = found
    })


const toConfirm = () => {
    phone_true()
    contact_phone_true()
    email_true()
    if (phone_error.value || contact_phone_error.value || email_error.value) return
    currentStep.value = 2
}

const submit = () => {
    currentStep.value = 3
    // 可加：發送 API / form.reset()
}

const go_back_event = () => {
    store.resetForm()
    router.push('/event')      // 跳轉回活動列表
}
</script>

<template>
    <div class="animal_wrapper">
        <AnimatedAnimal
            :imgSrc="turtle"
            alt="Sea Turtle"
            :size="160"
            :sizeMobile="100"
            direction="rtl"
            endLeft="70%"
            bottom="20px"
            :showBubbles="true"
            :bubbleLeft="'15%'"
            :animationDuration="'12s'"
            :zIndex="3"
        />
        <div class="wrapper">
            <form_process :current-step="currentStep" />

            <!-- Step 1：填寫資料 -->
            <form v-if="currentStep === 1" @submit.prevent="toConfirm">
            <div class="content">
                <div class="info">
                    <div class="form_left">
                        <div class="input_group">
                            <label>
                                <p>姓名<span class="required">*</span></p>
                                <input id="name" v-model="store.formData.name" placeholder="請輸入姓名" required />
                            </label>
                        </div>

                        <div class="input_group">
                            <label>
                                <p>電話<span class="required">*</span></p>
                                <input id="phone" v-model="store.formData.phone" @blur="phone_true" placeholder="請輸入電話" required />
                            </label>
                            <sub v-show="phone_error" class="msg_error">{{ phone_error }}</sub>
                        </div>

                        <div class="input_group">
                            <label>
                                <p>Email</p>
                                <input v-model="store.formData.email" @blur="email_true" placeholder="請輸入Email" />
                            </label>
                            <sub v-show="email_error" class="msg_error">{{ email_error }}</sub>
                            </div>
                        </div>

                    <div class="form_right">
                        <div class="input_group">
                            <label>
                                <p>緊急聯絡人</p>
                                <input id="contact_person" v-model="store.formData.contact_person" placeholder="請輸入姓名" />
                            </label>
                        </div>

                        <div class="input_group">
                            <label>
                                <p>緊急聯絡人電話</p>
                                <input id="contact_phone" v-model="store.formData.contact_phone" @blur="contact_phone_true" placeholder="請輸入電話" />
                            </label>
                            <sub v-show="contact_phone_error" class="msg_error">{{ contact_phone_error }}</sub>
                        </div>
                    </div>
                </div>
                <div class="input_group">
                    <label>
                        <p>備註</p>
                        <textarea v-model="store.formData.note"></textarea>
                    </label>
                </div>
            </div>
            <Button type="submit" class="next">下一步</Button>
            </form>

            <!-- Step 2：確認資料 -->
            <div v-else-if="currentStep === 2">
            <div class="info_check">
                    <h3>活動資訊</h3>
                <ul class="info_event">
                    <li><span>活動名稱：</span>{{ event?.title }}</li>
                    <li><span>活動時間：</span>{{ event?.dateTime }}</li>
                    <li><span>活動地點：</span>{{ event?.location }}</li>
                </ul>
                    <h3>參加者資訊</h3>
                <ul class="info_member">
                    <li><span>姓名：</span>{{ store.formData.name }}</li>
                    <li><span>電話：</span>{{ store.formData.phone }}</li>
                    <li><span>Email：</span>{{ store.formData.email }}</li>
                    <li><span>緊急聯絡人：</span>{{ store.formData.contact_person }}</li>
                    <li><span>緊急連絡人電話：</span>{{ store.formData.contact_phone }}</li>
                    <li><span>備註：</span>{{ store.formData.note }}</li>
                </ul>
            </div>
            <div class="button_items">
                <Button @click="currentStep--" class="back">返回修改</Button>
                <Button @click="submit">確認報名</Button>
            </div>
            </div>

            <!-- Step 3：報名成功 -->
            <div v-else-if="currentStep === 3" class="success">
            <div class="circle">
                <img src="@/assets/images/event/success_fff.svg" alt="icon_success" class="icon_success" />
                <h2>您已報名成功</h2>
            </div>
            <div class="button_items">
                <Button @click="go_back_event" class="back">返回活動頁面</Button>
                <Button class="event_member">報名活動查詢</Button>
            </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .animal_wrapper {
        position: relative;
    }

    .wrapper {
    max-width: 750px;
    margin: 60px auto;
    display: flex;
    flex-direction: column;
    gap: 60px;

    @include respond(md) {
        width: 80%;
        margin: 30px auto;
        gap: 20px;
    }
    }

    form {
        width: 80%;
        margin: 0 auto 40px;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 40px 60px;
        margin-bottom: 50px;
        background-color: v.$color-skyblue-light;
        border-radius: v.$border-radius-md;
        border: 3px solid v.$color-skyblue;
        @include respond(md){
            gap: 10px;
            padding: 20px 20px;
            margin-bottom: 30px;
            align-items: center;
        }
    }

    .info {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        @include respond(md) {
            flex-direction: column;
            gap: 10px;
        }
    }

    .form_left,
    .form_right {
        max-width: 250px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        @include respond(md){
            gap: 10px;
        }
    }

    .input_group {
        display: flex;
        flex-direction: column;

        .required {
            color: v.$color-error;
        }

        input,
        textarea {
            width: 100%;
            border: none;
            border-radius: v.$border-radius-sm;
            padding: 0.5rem;
            font-size: v.$sub-desktop;

            @include respond(md) {
                font-size: v.$sub-mobile;
            }
        }

        textarea {
            height: 120px;
            resize: none;
        }
    }

    .msg_error {
        color: v.$color-error;
        font-size: v.$sub-desktop;

        @include respond(md) {
            font-size: v.$sub-mobile;
        }
    }

    .next {
        display: block;
        margin: 0 auto;
    }

    .button_items {
        display: flex;
        justify-content: center;
        gap: 20px;

        @include respond(md) {
            flex-direction: column;
            align-items: center;
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

    .info_check {
        width: 80%;
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin: 0 auto 50px;
        border-radius: v.$border-radius-md;
        border: 3px solid v.$color-skyblue;
        @include respond(md){
            
        }
        h3 {
            width: 100%;
            padding: 12px 16px;
            background-color: v.$color-skyblue-light;
            text-align: center;
            font-weight: v.$font-bold;
        }
        ul {
            padding: 0 3rem;
            @include respond(md){
                padding: 0 1.5rem;
            }
            li {
                font-size: v.$p-desktop;
                letter-spacing: v.$letter-spacing-normal;
                padding-bottom: 1rem;
                @include respond(md){
                    font-size: v.$p-mobile;
                    padding-bottom: .5rem;
                }
                span {
                    font-weight: v.$font-bold;
                }
            }
        }
        .info_member {
            padding-bottom: 30px;
        }
    }

        .circle {
        width: 270px;
        height: 270px;
        background-color: v.$color-blue;
        color: #fff;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto 50px;

        @include respond(md) {
            width: 170px;
            height: 170px;
            margin-bottom: 30px;
        }
    }
</style>