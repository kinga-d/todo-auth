const TodoModel = require("../models/TodoModel");

module.exports = async (req, res) => {
  const { text, userId } = req.body;
  const todo = new TodoModel({
    userId,
    text,
    completed: false,
  });
  const newTodo = await todo.save();
  res.json(newTodo);
};
