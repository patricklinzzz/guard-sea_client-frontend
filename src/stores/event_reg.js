import { defineStore } from "pinia";

export const useRegStore = defineStore('event_reg', {
    state: ()=> ({
        formData: {
            name: '',
            phone: '',
            email: '',
            contact_person: '',
            contact_phone: '',
            note: '',
        }
    }),
    actions: {
        updateForm(data) {
            this.formData = { ...this.formData, ...data }
        },
        resetForm() {
            //清空資料，報名成功後重設
            this.formData = {
                name: '',
                phone: '',
                email: '',
                contact_person: '',
                contact_phone: '',
                note: '',
            }
        }
    }
})