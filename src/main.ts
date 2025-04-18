//import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from "./vuetify";

const app = createApp(App).use(router).use(vuetify).mount('#app')