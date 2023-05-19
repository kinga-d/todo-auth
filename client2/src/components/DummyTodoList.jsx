import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import createTodoRequest from "../api/createTodoRequest";
import { Input, Button, useMediaQuery, ListItem, Box } from "@mui/material";

export const DummyTodoList = (props) => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [text, setText] = useState("");
  const [dummyTodos, setDummyTodo] = useState([
    { id: 1, text: "example task" },
  ]);

  const handleDeleteClick = (id) => {
    const updatedTodos = dummyTodos.filter((todo) => todo.id !== id); // Filter out the todo with the specified id
    setDummyTodo(updatedTodos);
  };

  return (
    <div>
      <div>
        <div className="flex justify-center items-center mt-[20px]">
          <Input
            sx={{
              bgcolor: "#6E56FF",
              color: "#ffffff",
              fontSize: 22,
              textTransform: "none",
              width: 380,
              height: 51,
              px: 5,
              fontStyle: "italic",
              fontWeight: "light",
            }}
            type="text"
            value={text}
            placeholder="clean up your thoughts"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            sx={{
              bgcolor: "#93FF56",
              color: "#000000",
              fontSize: 22,
              width: 100,
              textTransform: "none",
              borderRadius: 0,
            }}
            onClick={() => {
              if (text.trim() !== "") {
                setDummyTodo([...dummyTodos, { id: Date.now(), text: text }]);
                setText("");
              }
            }}
          >
            +task
          </Button>
        </div>
        {dummyTodos.map((todo) => (
          <div key={Math.random()}>
            <Box className="flex justify-center items-center mt-6">
              <Input
                sx={{
                  bgcolor: "#93FF56",
                  color: "#000000",
                  fontSize: 22,
                  textTransform: "none",
                  width: 380,
                  height: 51,
                  px: 5,
                  fontStyle: "italic",
                  fontWeight: "light",
                }}
                value={todo.text}
                type="text"
                onChange={() => {}}
              />

              <Button
                sx={{
                  bgcolor: "#6E56FF",
                  color: "#ffffff",
                  fontSize: 22,
                  textTransform: "none",
                  borderRadius: 0,
                  ml: 5,
                }}
                onClick={() => handleDeleteClick(todo.id)}
              >
                -
              </Button>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};
