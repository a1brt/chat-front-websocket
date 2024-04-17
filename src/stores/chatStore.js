import { defineStore } from "pinia";
import { getUserRooms } from "../api/roomApi";

export const useChatStore = defineStore("chat", {
  state: () => ({
    user: {},
    currentRoom: {},
    rooms: [],
    roomSelected:false
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setCurrentRoom(room) {
      this.currentRoom = room;
    },
    setRooms(rooms) {
      this.rooms = rooms;
    },
    setRoomSelected(changed){

      this.roomSelected = changed
    },
    async refreshRooms() {
      const data = await getUserRooms(this.user.id);
      this.rooms = data;
    },
  },
  getters: {
    loggedIn: (state) => Object.keys(state.user).length !== 0, //checks if user is set
  },
});
