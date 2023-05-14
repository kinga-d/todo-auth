import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import createTodoRequest from "../api/createTodoRequest";

export const NewTodoForm = (props) => {
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
          <div className="flex justify-center items-center">
            <input
              className="w-[343px] h-[61px] text-[40px] bg-[#6E56FF]"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="w-[135px] h-[61px] text-[40px] bg-[#93FF56]">
              +task
            </button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};
