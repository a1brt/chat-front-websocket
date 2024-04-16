import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";

import Pusher from "pusher-js";
import axios from "axios";
import Echo from "laravel-echo";

// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: "pusher",
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//     encrypted: true,
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     authorizer: (channel) => {
//         return {
//             authorize: (socketId, callback) => {
//                 axios.post('http://chat.test/api/broadcasting/auth', {
//                     socket_id: socketId,
//                     channel_name: channel.name
//                 })
//                 .then(response => {
//                     callback(false, response.data);
//                 })
//                 .catch(error => {
//                     callback(true, error);
//                 });
//             }
//         };
//     },
// })
createApp(App).use(createPinia()).mount("body");
