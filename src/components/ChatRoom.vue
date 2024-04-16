<template>
  <div class="chat-room">
    <ul v-if="store.roomSelected" class="messages">
      <li
        v-for="message in messages"
        class="message"
        :key="message.id"
        :class="{ currentUserMessage: message.author_id === store.user.id }"
      >
        {{ message.content }}
      </li>
    </ul>
    <form
      v-if="store.roomSelected"
      action="#"
      class="message-field"
      @submit.prevent="handleSendMessage"
    >
      <input type="text" class="message-input" v-model="messageInput" />
      <button
        type="submit"
        :disabled="inputDisabled"
        @click="handleSendMessage"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useChatStore } from "../stores/chatStore";
import { getRoomsMessages, createMessage } from "../api/messageApi";
import { storeToRefs } from "pinia";

const store = useChatStore();
const messageInput = ref("");
const inputDisabled = ref(false);
const messages = ref([]);

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
}

onMounted(async() => {
  messages.value = await getRoomsMessages(currentRoom.value.room_id);

  window.Echo.channel(`chat-rooms-${store.currentRoom.room_id}`).listen(
  ".message-sent",
  (e) => {
    messages.value.push(e);
  }
);
})


</script>

<style scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid black;
}

.messages {
  display: flex;
  gap: 5px;
  flex-direction: column;
  flex: 5;
  max-height: 700px;
  overflow: auto;
  padding: 5px 20px;
}
.message-field {
  flex: 1;
  align-content: flex-end;
  padding: 20px;
}
.message {
  width: fit-content;
  min-width: 50px;
  text-align: center;
  border: 1px solid black;
  border-radius: 12px;
  background-color: azure;
  padding: 2px 12px;
}
.message-input {
  width: 90%;
}

.currentUserMessage {
  align-self: flex-end;
  background-color: rgb(57, 156, 243);
}
</style>
