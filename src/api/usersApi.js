import axios from "axios";

const API_URL =
  "https://ibuprofen-undertake-unsecured.ngrok-free.dev";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to load users:", error);
    throw error;
  }
};