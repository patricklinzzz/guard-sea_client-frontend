// 手機格式驗證

// 1️⃣不允許空值（必填欄位）
export function validatePhone(phone) {
    const pattern = /^09\d{8}$/
    return pattern.test(phone.trim()) ? '' : '請輸入正確的手機號碼格式'
}
// 2️⃣允許空值（非必填欄位）
export function validateOptionalPhone(phone) {
    const value = phone.trim()
    if (value === '') return ''
    return /^09\d{8}$/.test(value) ? '' : '請輸入正確的手機號碼格式'
}

// Email格式驗證
export function validateEmail(email) {
    const value = email.trim()
    if (value === '') return ''
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ''
        : '請輸入正確的Email格式'
}

/* 
// 如果想支援更多欄位（例如身分證、地址、生日等），都可以繼續擴充元件 validators.js
// 例如 (簡單示範，請依實際規則調整)：

    export function validateIdNumber(id) {
        return /^[A-Z][12]\d{8}$/.test(id.trim()) ? '' : '身分證格式錯誤'
    }


// 引入範例：

import { validatePhone, validateOptionalPhone, validateEmail } from '@/utils/validators.js'

const phone_error = ref('')
const contact_phone_error = ref('')
const email_error = ref('')

const phone_true = () => {
    phone_error.value = validatePhone(store.formData.phone)
}
const contact_phone_true = () => {
    contact_phone_error.value = validateOptionalPhone(store.formData.contact_phone)
}
const email_true = () => {
    email_error.value = validateEmail(store.formData.email)
}

*/