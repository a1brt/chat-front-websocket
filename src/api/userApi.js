import axios from "axios";

async function createUser(username) {
  const postData = {
    username: username,
  };

  const url = `${import.meta.env.VITE_BASE_URL}/users`;

  try {
    const response = await axios.post(url, postData);
    return [true, response.data];
  } catch (error) {
    console.error("Error:", error.response.data.message);
    return [false, error.response.data.message];
  }
}

async function connectUser(username){
  const postData = {
    username: username,
  };

  const url = `${import.meta.env.VITE_BASE_URL}/login`;

  try {
    const response = await axios.post(url, postData);
    return [true, response.data];
  } catch (error) {
    console.error("Error:", error.response.data.message);
    return [false, error.response.data.message];
  }
}

export { createUser, connectUser };
