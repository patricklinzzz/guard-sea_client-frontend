import './assets/style/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import axios from 'axios'

axios.defaults.withCredentials = true

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const authStore = useAuthStore()

if (document.cookie.includes('PHPSESSID')) {
  authStore.fetchUser().then(() => {
    app.mount('#app')
  })
} else {
  app.mount('#app')
}
