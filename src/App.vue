<script setup>
import ChatContainer from "./components/ChatContainer.vue";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
});
</script>

<template>
  <ChatContainer />
</template>

<style scoped></style>
