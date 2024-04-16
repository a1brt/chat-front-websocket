<template>
  <vue-advanced-chat
  height="calc(100vh - 20px)"
			:current-user-id="currentUserId"
			:rooms="JSON.stringify(rooms)"
            :loading-rooms=false
            show-audio=true
            :room-id="2"
			:messages="JSON.stringify(messages)"
			:messages-loaded="messagesLoaded"
			@send-message="sendMessage($event.detail[0])"
			@fetch-messages="fetchMessages($event.detail[0])"
  />
</template>

<script setup>
import { register } from "vue-advanced-chat";
import { ref } from "vue";
register();

const currentUserId = 1;
const rooms =  [
				{
					roomId: '1',
					roomName: 'Room 1',
					avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
					users: [
						{ _id: '1234', username: 'John Doe' },
						{ _id: '4321', username: 'John Snow' }
					]
				},
                {
					roomId: '2',
					roomName: 'Room 2',
					avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
					users: [
						{ _id: '1234', username: 'John Doe' },
						{ _id: '4321', username: 'John Snow' }
					]
				}
			];
const messages = [];
const roomActions = [
  { name: "inviteUser", title: "Invite User" },
  { name: "removeUser", title: "Remove User" },
  { name: "deleteRoom", title: "Delete Room" },
];
const messagesLoaded = true;


function sendMessage(e){
    console.log(e);
}

function fetchMessages(e){
    console.log(e);
}
</script>

<style scoped></style>
