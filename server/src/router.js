const express = require("express");
const isLoggedIn = require("./middleware/isLoggedIn");
const readTodoRoute = require("./routes/readTodosRoute");
const createTodoRoute = require("./routes/createTodoRoute");
const updateTodoRoute = require("./routes/updateTodoRoute");
const removeTodoRoute = require("./routes/removeTodoRoute");

const router = express.Router();

router.get("/todos", isLoggedIn, readTodoRoute);
router.post("/todos", isLoggedIn, createTodoRoute);
router.put("/todos/:id", isLoggedIn, updateTodoRoute);
router.delete("/todos/:id", isLoggedIn, removeTodoRoute);

module.exports = router;
