import { createApp } from 'vue'
import pinia from './stores/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import CKEditor from '@ckeditor/ckeditor5-vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(CKEditor)

app.mount('#app')
