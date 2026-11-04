import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/todos";
import type { TodoInput } from "../types/todo";

const TODOS_KEY = ["todos"];

export function useTodos() {
  return useQuery({
    queryKey: TODOS_KEY,
    queryFn: api.getTodos,
  });
}

function useTodoMutation<TVariables>(
  mutationFn: (variables: TVariables) => Promise<unknown>,
  successMessage: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
      notifications.show({
        message: successMessage,
        color: "green",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Something went wrong",
        message: error.message,
        color: "red",
      });
    },
  });
}

export const useCreateTodo = () => {
  return useTodoMutation(api.createTodo, "Todo created");
};

export const useUpdateTodo = () => {
  return useTodoMutation(
    ({ id, ...input }: TodoInput & { id: string }) => api.updateTodo(id, input),
    "Todo updated",
  );
};

export const useToggleTodo = () => {
  return useTodoMutation(api.toggleTodo, "Todo status changed");
};

export const useDeleteTodo = () => {
  return useTodoMutation(api.deleteTodo, "Todo deleted");
};

// The API has no bulk endpoint, so this sends one delete per todo.
export const useClearCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const results = await Promise.allSettled(ids.map(api.deleteTodo));
      const failed = results.filter((r) => r.status === "rejected").length;
      if (failed > 0) {
        throw new Error(
          `${failed} of ${ids.length} tasks could not be deleted`,
        );
      }
      return ids.length;
    },
    onSuccess: (count) => {
      notifications.show({
        message: `Cleared ${count} completed ${count === 1 ? "task" : "tasks"}`,
        color: "green",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Something went wrong",
        message: error.message,
        color: "red",
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: TODOS_KEY }),
  });
};
