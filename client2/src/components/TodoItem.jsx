import { useMutation, useQueryClient } from "react-query";
import updateTodoRequest from "../api/updateTodoRequest";
import deleteTodoRequest from "../api/deleteTodoRequest";
import {
  Box,
  Input,
  Checkbox,
  Button,
  useMediaQuery,
  ListItem,
} from "@mui/material";

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
        onChange={(e) => {
          updateTodo({
            ...todo,
            text: e.target.value,
          });
        }}
      />
      <Checkbox
        sx={{
          size: "large",
          ml: -6,
        }}
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
          ml: 5,
        }}
        onClick={() => deleteTodo(todo)}
      >
        -
      </Button>
    </Box>
  );
};
