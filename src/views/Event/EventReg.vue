<script setup>
    import Button from '@/components/buttons/button.vue'
    import { useRouter } from 'vue-router'
    import { useRegStore } from '@/stores/event_reg';

    const props = defineProps(['id'])
    const router = useRouter()
    const store = useRegStore()

    const to_confirm = () => {
        router.push(`/event/reg_confirm/${props.id}`)
    }
</script>

<template>
    <body>
        <div class="wrapper">
            <h1>報名流程</h1>
            <section class="process">
                <div class="box_member">
                    <img src="@/assets/images/event/member_fff.svg" alt="icon_member" class="icon_member">
                    <p>填寫資料</p>
                </div>
                <div class="line"></div> 
                <div class="box_confirm">
                    <img src="@/assets/images/event/confirm.svg" alt="icon_confirm" class="icon_confirm">
                    <p>確認資料</p>
                </div>
                <div class="line"></div>
                <div class="box_success">
                    <img src="@/assets/images/event/success.svg" alt="icon_success" class="icon_success">
                    <p>報名成功</p>
                </div>
            </section>

            <form @submit.prevent="to_confirm">
                <div class="content">
                    <div class="info">
                        <div class="form_left">
                            <div class="input_group">
                                <p>
                                    <label for="name">姓名<span class="required">*</span></label>
                                </p>
                                <input id="name" v-model="store.formData.name" placeholder="請輸入姓名" required/>
                            </div>
                            <div class="input_group">
                                <p>
                                    <label for="phone">電話<span class="required">*</span></label>
                                </p>
                                <input id="phone" v-model="store.formData.phone" placeholder="請輸入電話" required/>
                            </div>
                            <div class="input_group">
                                <p>
                                    <label for="email">Email</label>
                                </p>
                                <input v-model="store.formData.email" placeholder="請輸入Email"/>
                            </div>
                        </div>

                        <div class="form_right">
                            <div class="input_group">
                                <p>
                                    <label for="contact_person">緊急聯絡人</label>
                                </p>
                                <input id="contact_person" v-model="store.formData.contact_person" placeholder="請輸入姓名">
                            </div>
                            <div class="input_group">
                                <p>
                                    <label for="contact_phone">緊急聯絡人電話</label>
                                </p>
                                <input id="contact_phone" v-model="store.formData.contact_phone" placeholder="請輸入電話">
                            </div>
                        </div>
                    </div>
                    <div class="input_group">
                        <p>
                            <label for="note">備註</label>
                        </p>
                        <textarea v-model="store.formData.note"></textarea>
                    </div>
                </div>
                <Button type="submit" class="next">下一步</Button> 
                <!-- button要放在form裡面，不然不能送出 -->
            </form>
        </div>
    </body>
</template>

<style lang="scss" scoped>
    .wrapper{
        max-width: 900px;
        width: 100%;
        margin: 60px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 50px;
        @include respond(md) {
            width: 80%;
            margin: 30px auto;
            gap: 30px;
        }
    }
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
    .icon_member,
    .icon_confirm,
    .icon_success {
        max-width: 100px;
        max-height: 100px;
        width: 80%;
        height: 80%;
        padding: 20px;
        flex: 1;
        color: v.$color-black;
        background-color: v.$color-skyblue-light;
        border-radius: v.$border-radius-md;
        @include respond(md) {
            width: 60%;
            height: 60%;
        padding: 10px;
        }
    }
    .icon_member {
        stroke: #fff;
        background-color: v.$color-blue;
    }
    .line {
        max-width: 1000px;
        flex: 1;
        height: 2px;
        border-bottom: 2px dashed v.$color-gray;
    }

    form {
        width: 80%;
        margin: 0 auto 40px;
    }
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 30px;
        padding: 40px 60px;
        margin-bottom: 40px;
        background-color: v.$color-skyblue-light;
        border-radius: v.$border-radius-md;
        border: 3px solid v.$color-skyblue;
    }
    .info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        @include respond(md){
            flex-direction: column;
            gap: 30px;
        }
    }
    .form_left,
    .form_right{
        max-width: 250px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    .input_group {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        label {
            margin-bottom: 4px;
        }
        .required {
            color: v.$color-error;
        }
        input,
        textarea {
            flex: 1;
            border: none;
            border-radius: v.$border-radius-sm;
            padding: .5rem;
        }
    }

    .next {
        display: block;
        margin: 0 auto;
    }
</style>