import { createApp } from 'vue'
import 'vant/lib/index.css';

import App from './App.vue'
import { storePlugin } from './stores'

createApp(App).use(storePlugin).mount('#app')
