import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import DataV from '@dataview/datav-vue3';
import App from './App.vue'
import router from './router'
import per from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "@/utils/rem.js"
const app = createApp(App)
app.use(createPinia().use(per))
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(DataV, { classNamePrefix: 'dv-' });
app.mount('#app')
