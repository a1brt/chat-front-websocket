<template>
  <div
    class="container"
    :style="{
      boxShadow: `--el-box-shadow-light)`,
    }"
  >
    <UserField />
    <div v-if="store.loggedIn" class="chat-content">
      <Sidebar />
      <ChatRoom />
    </div>
  </div>
</template>

<script setup>
import UserField from "./UserField.vue";
import ChatRoom from "./ChatRoom.vue";
import Sidebar from "./Sidebar.vue";
import { useChatStore } from "../stores/chatStore";

const store = useChatStore();
</script>

<style scoped>
.container {
  position: absolute;
  top: 10%;
  left: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 60%;
  box-shadow: var(--el-box-shadow-light);
  background-color: white;
}

.chat-content {
  display: flex;
  max-height: 400px;
  flex: 3;
}
</style>
