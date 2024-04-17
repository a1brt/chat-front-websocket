<template>
  <div class="user-field flex-column-center">
    <div class="credentials flex-column-center" v-if="!store.loggedIn">
      <h3>Connect/Create user</h3>
      <el-form
        class="user-form"
        :model="form"
        action="#"
        @keydown.enter.prevent
      >
        <el-input placeholder="enter username" v-model="username" />
        <el-button
          class="create-btn"
          type="primary"
          :disabled="submitDisabled"
          @click="handleUserConnection(connectUser)"
        >
          Connect
        </el-button>
        <el-button
          :disabled="submitDisabled"
          @click="handleUserConnection(createUser)"
        >
          Create
        </el-button>
      </el-form>
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
  padding: 10px;
}

.user-form {
  display: flex;
}
.create-btn {
  margin-left: 12px;
}
</style>
