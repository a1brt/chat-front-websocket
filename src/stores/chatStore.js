import { defineStore } from "pinia";
import { getUserRooms } from "../api/roomApi";
import { getRoomsMessages } from "../api/messageApi";

export const useChatStore = defineStore("chat", {
  state: () => ({
    user: {},
    currentRoom: {},
    rooms: [],
    flag:false
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
    setFlag(fl){
      this.flag = fl
    },
    async refreshRooms() {
      const data = await getUserRooms(this.user.id);
      this.rooms = data;
    },
  },
  getters: {
    loggedIn: (state) => Object.keys(state.user).length !== 0, //checks if user is set
    roomSelected: (state) => Object.keys(state.currentRoom).length !== 0, 
    // currentRoomMessages: async (state) =>
    //   {console.log(state.currentRoom);
    //     await getRoomsMessages(state.currentRoom.room_id)},
  },
});
