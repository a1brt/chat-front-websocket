<template>
  <div class="sidebar">
    <el-form
      class="room-form flex-column-center"
      v-if="store.loggedIn"
      action="#"
      @submit.prevent
      @keydown.enter.prevent
    >
      <el-input
        class="room-input"
        type="text"
        name="compainion"
        v-model="roomName"
        placeholder="search"
      />
      <el-button
        v-if="noRooms && !loading"
        type="primary"
        :disabled="submitDisabled"
        @click="handleNewRoom"
      >
        Chat
      </el-button>
    </el-form>
    <el-container v-loading="loading" class="room-container">
      <span
        v-for="room in rooms"
        class="room"
        :class="{ selected: room.room_id === store.currentRoom.room_id }"
        @click="handleRoomSelected(room)"
      >
        {{ getRoomName(room) }}
      </span>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useChatStore } from "../stores/chatStore";
import { createRoom } from "../api/roomApi";

const SELF_ROOM_NAME = "Saved Messages";

const store = useChatStore();
const roomName = ref("");
const loading = ref(true);
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
  if (room.room_id === store.currentRoom.room_id) return;
  store.setRoomSelected(false);
  nextTick(() => {
    store.setCurrentRoom(room);

    store.setRoomSelected(true);
  });
}

async function handleNewRoom() {
  submitDisabled.value = true;
  const [passed, data] = await createRoom(store.user.id, roomName.value);
  if (passed) {
    data.users = data.users.filter((u) => u.id !== store.user.id);
    store.setCurrentRoom(data);
    store.refreshRooms();
  } else {
    alert(data);
  }
  roomName.value = "";
  submitDisabled.value = false;
}

const rooms = computed(() => {
  if (!roomName.value) {
    return store.rooms;
  }
  return store.rooms.filter((r) => getRoomName(r).startsWith(roomName.value));
});

const noRooms = computed(() => {
  return rooms.value.length === 0;
});

onMounted(async () => {
  await store.refreshRooms();
  loading.value = false;
});
</script>

<style scoped>
.sidebar {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}

.room-container {
  display: flex;
  flex-direction: column;
}

.room-input {
  margin-bottom: 10px;
}
.room {
  padding: 10px 20px;

  cursor: pointer;
}
.room:hover {
  background-color: aliceblue;
}
.selected {
  background-color: #c8e3f9;
}
</style>
