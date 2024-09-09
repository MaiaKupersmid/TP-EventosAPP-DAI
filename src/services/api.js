const API_URL = 'https://diverse-tightly-mongoose.ngrok-free.app';

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/api/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const getEvents = async (token) => {
  const response = await fetch(`${API_URL}/api/event`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};