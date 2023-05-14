const API_URL = `http://localhost:5000`;

export default (todo, token) => {
  return fetch(`${API_URL}/todos/${todo._id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
};
