<template>
  <div class="chat-room">
    <div v-if="!store.roomSelected" class="placeholder">
      <span class="placeholder-message"> Select a chat to start messaging </span>
    </div>
    <ChatBox v-if="store.roomSelected" />
  </div>
</template>

<script setup>
import { useChatStore } from "../stores/chatStore";
import ChatBox from "./ChatBox.vue";
const store = useChatStore();
</script>

<style scoped>
.chat-room {
  display: flex;
  flex: 3;
  flex-direction: column;
  border: 1px solid rgb(180, 185, 189);
  border-radius: 10px;
  min-height: 300px;
}
.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.placeholder-message{
  background-color: #4da7ff;
  color: white;

  padding: 2px 12px;
  border-radius: 12px;
}
</style>
