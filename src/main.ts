import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import icon from './global/registerIcon'

import './assets/css/index.css'
import 'normalize.css'

const app = createApp(App)
app.use(router)
app.use(pinia)

app.use(icon)
app.mount('#app')
