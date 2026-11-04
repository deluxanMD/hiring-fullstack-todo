import { Alert, Center, Loader, Stack, Text } from "@mantine/core";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Could not load todos">
        {error.message}
      </Alert>
    );
  }

  if (!todos?.length) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        No todos yet. Add your first one above.
      </Text>
    );
  }

  return (
    <Stack gap="sm">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </Stack>
  );
}
