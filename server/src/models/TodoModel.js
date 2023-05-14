const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  text: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = TodoModel;
