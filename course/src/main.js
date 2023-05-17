import { VueElement, createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import axios from 'axios'
import 'element-plus/theme-chalk/index.css';
import Router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties.$axios=axios
app.use(Router)
app.use(ElementPlus)
app.mount('#app')


