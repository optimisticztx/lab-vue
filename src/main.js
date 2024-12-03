import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import index from './router/index.js'
import pinia from './stores/pinia.js'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

createApp(App)
    .use(index)
    .use(pinia)
    .use(ElementPlus, {
        locale: zhCn,
    })
    .mount('#app')
