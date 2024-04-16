import axios from "axios";

async function getRoomsMessages(room_id) {
  const url = `${import.meta.env.VITE_BASE_URL}/rooms/${room_id}/messages`;
  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
   // console.error("Error:", error.response.data);
    return error.response.data.message;
  }
}

async function createMessage(userId, room_id, content) {
  const postData = {
    author_id: userId,
    room_id: room_id,
    content: content,
  };
  const url = `${import.meta.env.VITE_BASE_URL}/messages`;
  try {
    const response = await axios.post(url, postData);
    return [true, response.data];
  } catch (error) {
    return [false, error.response.data.message];
  }
}

export { getRoomsMessages, createMessage };
