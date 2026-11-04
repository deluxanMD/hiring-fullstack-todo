import { Group, SegmentedControl, Text } from "@mantine/core";
import { useTodos } from "../hooks/useTodos";
import type { TodoFilter } from "../types/todo";

interface TodoFilterBarProps {
  value: TodoFilter;
  onChange: (value: TodoFilter) => void;
}

export function TodoFilterBar({ value, onChange }: TodoFilterBarProps) {
  const { data: todos } = useTodos();
  const pending = todos?.filter((todo) => !todo.done).length ?? 0;

  return (
    <Group justify="space-between">
      <SegmentedControl
        radius="xl"
        value={value}
        onChange={(next) => onChange(next as TodoFilter)}
        data={[
          { label: "All", value: "all" },
          { label: "Pending", value: "pending" },
          { label: "Completed", value: "completed" },
        ]}
      />
      {todos && (
        <Text c="dimmed" fw={500}>
          {pending} {pending === 1 ? "task" : "tasks"} left
        </Text>
      )}
    </Group>
  );
}
