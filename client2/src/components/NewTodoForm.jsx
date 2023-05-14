import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import createTodoRequest from "../api/createTodoRequest";
import { Input, Button, useMediaQuery, ListItem } from "@mui/material";

export const NewTodoForm = (props) => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const { mutate: createTodo } = useMutation(
    (newTodo) => createTodoRequest(newTodo, props.token),
    { onSettled: () => queryClient.invalidateQueries("todos") }
  );

  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!text) return;
            createTodo({
              text: text,
              userId: props.userId,
            });
            setText("");
          }}
        >
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
            >
              +task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
