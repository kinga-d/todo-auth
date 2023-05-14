import { useMutation, useQueryClient } from "react-query";
import updateTodoRequest from "../api/updateTodoRequest";
import deleteTodoRequest from "../api/deleteTodoRequest";
import { Button, useMediaQuery } from "@mui/material";

export const TodoItem = ({ todo, token }) => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const queryClient = useQueryClient();

  const { mutate: updateTodo } = useMutation(
    (updatedTodo) => updateTodoRequest(updatedTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const { mutate: deleteTodo } = useMutation(
    (deletedTodo) => deleteTodoRequest(deletedTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return (
    <div className="flex justify-center items-center">
      <input
        className="w-[478px] h-[61px] text-[40px] bg-[#93FF56]"
        value={todo.text}
        type="text"
        onChange={(e) => {
          updateTodo({
            ...todo,
            text: e.target.value,
          });
        }}
      />
      <div className="inline-block align-middle">
        <input
          className="w-[72px] h-[61px]  bg-[#93FF56]"
          checked={todo.completed}
          type="checkbox"
          onChange={() => {
            updateTodo({
              ...todo,
              completed: !todo.completed,
            });
          }}
        />

        <Button
          sx={{
            bgcolor: "#6E56FF",
            color: "#ffffff",
            fontSize: 22,

            textTransform: "none",
            borderRadius: 0,
          }}
          onClick={() => deleteTodo(todo)}
        >
          -
        </Button>
      </div>
    </div>
  );
};
