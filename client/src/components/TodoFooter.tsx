import { Button, Group, Text } from "@mantine/core";
import { useClearCompleted, useTodos } from "../hooks/useTodos";

export function TodoFooter() {
  const { data: todos } = useTodos();
  const clearCompleted = useClearCompleted();

  if (!todos?.length) return null;

  const completedIds = todos.filter((todo) => todo.done).map((t) => t._id);

  return (
    <Group justify="space-between" px="xs">
      <Text size="sm" c="dimmed">
        Hover a task to edit or delete it
      </Text>
      <Button
        variant="subtle"
        color="gray"
        size="compact-sm"
        disabled={completedIds.length === 0}
        loading={clearCompleted.isPending}
        onClick={() => clearCompleted.mutate(completedIds)}
      >
        Clear completed
      </Button>
    </Group>
  );
}
