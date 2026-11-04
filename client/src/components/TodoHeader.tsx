import { Group, Text, Title } from "@mantine/core";
import { useTodos } from "../hooks/useTodos";

const now = new Date();
const weekday = now.toLocaleDateString("en-GB", { weekday: "long" });
const dayAndMonth = now.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
});
const today = `${weekday}, ${dayAndMonth}`;

export function TodoHeader() {
  const { data: todos } = useTodos();
  const completed = todos?.filter((todo) => todo.done).length ?? 0;

  return (
    <Group justify="space-between" align="flex-end">
      <div>
        <Text c="dimmed" fw={500}>
          {today}
        </Text>
        <Title order={1} fz={40} lh={1.1}>
          My tasks
        </Title>
      </div>
      {todos && (
        <Text c="dimmed" fw={500} pb={6}>
          {completed} of {todos.length} completed
        </Text>
      )}
    </Group>
  );
}
