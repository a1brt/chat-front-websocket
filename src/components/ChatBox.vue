<template>
  <div class="current-chat">
    <el-container v-loading="loading" id="messages" class="messages">
      <span
        v-for="message in messages"
        class="message"
        :key="message.id"
        :class="{ currentUserMessage: message.author_id === store.user.id }"
      >
        {{ message.content }}
      </span>
    </el-container>

    <el-form
      action="#"
      class="message-field"
      @submit.prevent="handleSendMessage"
    >
      <el-input type="text" class="message-input" v-model="messageInput" />
      <el-button
        type="primary"
        :disabled="inputDisabled"
        @click="handleSendMessage"
      >
        <img src="../assets/send-icon.svg" alt="send" width="20" height="20" />
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from "vue";
import { useChatStore } from "../stores/chatStore";
import { getRoomsMessages, createMessage } from "../api/messageApi";
import { storeToRefs } from "pinia";

const store = useChatStore();
const messageInput = ref("");
const inputDisabled = ref(false);
const messages = ref([]);
const loading = ref(true);

const { currentRoom } = storeToRefs(store);

async function handleSendMessage() {
  inputDisabled.value = true;
  const [passed, data] = await createMessage(
    store.user.id,
    currentRoom.value.room_id,
    messageInput.value
  );
  if (!passed) {
    alert(data);
  }
  inputDisabled.value = false;
  messageInput.value = "";
  scrollToBottom();
}

onMounted(async () => {
  messages.value = await getRoomsMessages(currentRoom.value.room_id);
  loading.value = false;

  window.Echo.channel(`chat-rooms-${store.currentRoom.room_id}`).listen(
    ".message-sent",
    (e) => {
      messages.value.push(e);
    }
  );
});

onUpdated(() => {
  scrollToBottom();
});

function scrollToBottom() {
  const element = document.getElementById("messages");
  console.log(element.scrollHeight);
  element.scrollTop = element.scrollHeight;
}
</script>

<style scoped>
.current-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  display: flex;
  gap: 5px;
  flex-direction: column;
  flex: 5;
  max-height: 300px;
  overflow: auto;
  padding: 20px;
}
.message-field {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  align-content: flex-end;
  padding: 20px;
}
.message {
  width: fit-content;
  min-width: 50px;
  text-align: center;
  border-radius: 12px 12px 12px 0px;
  background-color: #e4e7ec;
  padding: 2px 12px;
}
.message-input {
  width: 90%;
}

.currentUserMessage {
  align-self: flex-end;
  background-color: rgb(84, 168, 241);
  color: white;
  border-radius: 12px 12px 0px 12px;
}
</style>
