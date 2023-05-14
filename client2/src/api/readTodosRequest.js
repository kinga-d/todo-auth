const API_URL = `http://localhost:5000`;

export default (token) => {
  return fetch(`${API_URL}/todos`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application-json",
    },
  }).then((response) => response.json());
};
