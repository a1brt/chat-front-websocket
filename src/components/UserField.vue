<template>
  <div class="user-field flex-column-center">
    <div class="credentials flex-column-center" v-if="!store.loggedIn">
      <h3>Connect/Create user</h3>
      <form action="#" @keydown.enter.prevent>
        <input
          type="text"
          id="username"
          class="useername"
          placeholder="enter username"
          v-model="username"
        />
        <button
          type="button"
          :disabled="submitDisabled"
          @click="handleUserConnection(connectUser)"
        >
          Connect
        </button>
        <button
          type="button"
          :disabled="submitDisabled"
          @click="handleUserConnection(createUser)"
        >
          Create
        </button>
      </form>
    </div>
    <div class="data flex-column-center" v-if="store.loggedIn">
      <h1>{{ store.user.username }}</h1>

      <h3 v-if="connected">Chatting with {{ compainion }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createUser, connectUser } from "../api/userApi";
import { createRoom } from "../api/roomApi";
import { useChatStore } from "../stores/chatStore";

const store = useChatStore();

const connected = ref(false);

const submitDisabled = ref(false);

const username = ref("");

async function handleUserConnection(methodFunction) {
  submitDisabled.value = true;
  const [passed, data] = await methodFunction(username.value);
  if (passed) {
    store.setUser(data);
  } else {
    alert(data);
  }
  submitDisabled.value = false;
}


</script>

<style scoped>
.user-field {
  border: 1px solid black;
  padding: 10px;
}
</style>
