<template>
  <div class="sidebar">
    <form
      class="flex"
      v-if="store.loggedIn"
      action="#"
      @submit.prevent="handleNewRoom"
    >
      <input
        type="text"
        name="compainion"
        v-model="compainionUser"
        placeholder="new chat with user"
      />
      <button type="submit" :disabled="submitDisabled">Chat</button>
    </form>
    <ul v-for="room in store.rooms">
      <li class="room" @click="handleRoomSelected(room)">
        {{ getRoomName(room) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useChatStore } from "../stores/chatStore";
import { createRoom } from "../api/roomApi";
import { storeToRefs } from "pinia";

const SELF_ROOM_NAME = "Saved Messages";

const store = useChatStore();
const { user } = storeToRefs(store);
const compainionUser = ref("");
const submitDisabled = ref(false);

function getRoomName(room) {
  switch (room.other_users.length) {
    case 0:
      return SELF_ROOM_NAME; //user's own chat
    case 1:
      return room.other_users[0].username; // username of the only other user
    default:
      "nothing here"; // group chat not implemented yet. should take room's name or concatinate all other user's names
  }
}

function handleRoomSelected(room) {
  store.setFlag(false);

  nextTick(() => {
    store.setCurrentRoom(room);

    nextTick(() => {
      store.setFlag(true);
    });
  });
}

async function handleNewRoom() {
  submitDisabled.value = true;
  const [passed, data] = await createRoom(store.user.id, compainionUser.value);
  if (passed) {
    data.users = data.users.filter((u) => u.id !== store.user.id);
    store.setCurrentRoom(data);
    store.refreshRooms();
  } else {
    alert(data);
  }
  compainionUser.value = "";
  submitDisabled.value = false;
}

watch(user, async () => {
  store.refreshRooms();
});
</script>

<style scoped>
.sidebar {
  flex: 1;
  overflow-y: auto;
}
.room {
  padding: 10px 20px;
  border: 1px solid black;
  cursor: pointer;
}
.room:hover {
  background-color: aliceblue;
}
</style>
