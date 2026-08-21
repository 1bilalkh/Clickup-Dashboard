const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/api/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};