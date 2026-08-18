const API_URL = "http://localhost:5000";

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/api/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};