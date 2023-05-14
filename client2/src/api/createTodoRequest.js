const API_URL = `http://localhost:5000`;

export default (todo, token) => {
  return fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      userId: todo.userId,
      text: todo.text,
      completed: false,
    }),
  });
};
