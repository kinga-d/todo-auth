const TodoModel = require("../models/TodoModel");
const admin = require("../config/firebase-config.js");

module.exports = async (req, res) => {
  const idToken = req.headers.authorization.split(" ")[1];
  const decodedToken = await admin.auth().verifyIdToken(idToken);

  const todos = await TodoModel.find({ userId: decodedToken.uid });

  return res.json(todos);
};
