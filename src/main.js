import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import 'element-plus/dist/index.css'


createApp(App).use(createPinia()).mount("body");
