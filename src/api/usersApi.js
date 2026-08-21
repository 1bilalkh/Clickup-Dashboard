import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users`);

    return response.data;
  } catch (error) {
    console.error("Failed to load users:", error);
    throw error;
  }
};