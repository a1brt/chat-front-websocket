<template>
  <div class="container">
    <Sidebar />
    <div class="chat-content ">
      <UserField />
      <ChatRoom v-if="store.flag"/>
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
  justify-content: center;
  padding: 20px;
  width: 60%;
  height: 80%;
}

.chat-content{
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 3;
}
</style>
