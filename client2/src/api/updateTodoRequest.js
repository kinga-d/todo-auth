const API_URL = `http://localhost:5000`;

export default (todo, token) => {
  return fetch(`${API_URL}/todos/${todo._id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application-json",
    },
    body: JSON.stringify({
      text: todo.text,
      completed: todo.completed,
    }),
  }).then((response) => response.json());
};
