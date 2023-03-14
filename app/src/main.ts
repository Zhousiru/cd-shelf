import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import routes from './routes'

import App from './App.vue'
import './style.scss'
import 'normalize.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')
