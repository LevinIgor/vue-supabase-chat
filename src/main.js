import './assets/base.css'
import '@/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import useStore from '@/stores'
import getRandomName from '@/utils/getRandomName'
import getLocationByIP from '@/utils/getLocationByIP'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const store = useStore()
store.setName(getRandomName())

getLocationByIP().then((country) => {
  store.setCountry(country)
})
