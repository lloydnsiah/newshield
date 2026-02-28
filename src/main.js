import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from "./routes/router"
import { initializeApp } from "firebase/app"
import store from "./store"
import App from './App.vue'

import './firebase'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
