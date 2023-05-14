import { useMutation, useQueryClient } from "react-query";
import updateTodoRequest from "../api/updateTodoRequest";
import deleteTodoRequest from "../api/deleteTodoRequest";

export const TodoItem = ({ todo, token }) => {
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

        <button
          className="w-[72px] h-[61px] text-[40px] bg-[#6E56FF]"
          onClick={() => deleteTodo(todo)}
        >
          -
        </button>
      </div>
    </div>
  );
};
