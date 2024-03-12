import './assets/base.css'
import '@/index.css'
import onlineHandler from '@/utils/onlineHandler.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import fetchAndSaveProjectStats from '@/utils/fetchProjectStats.js'
import fetchAndSaveUserLocation from '@/utils/fetchUserLocation.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

fetchAndSaveUserLocation()
fetchAndSaveProjectStats()
onlineHandler()
