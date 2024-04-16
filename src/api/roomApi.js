import axios from "axios";

async function createRoom(userId, compainionUsername) {
  const postData = {
    user_id: userId,
    to_user: compainionUsername
  };
  const url = `${import.meta.env.VITE_BASE_URL}/rooms`;
  try {
    const response = await axios.post(url, postData);
    return [true, response.data];
  } catch (error) {

    // Handle error
    return [false, error.response.data.message];
  }
}

async function getUserRooms(userId) {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${userId}/rooms`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error:", error.response.data);
    //return error.response.data.message];
  }
}
export { createRoom, getUserRooms };
