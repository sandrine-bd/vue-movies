import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './store/auth'
import { createPinia } from 'pinia'

import './style.css'
import '@phosphor-icons/vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const auth = useAuthStore()
auth.init()

app.mount('#app')
