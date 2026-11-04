import { Button, Card, Checkbox, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "motion/react";
import { useDeleteTodo, useToggleTodo } from "../hooks/useTodos";
import type { Todo } from "../types/todo";
import { EditTodoModal } from "./EditTodoModal";

export function TodoItem({ todo }: { todo: Todo }) {
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();
  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  return (
    <motion.div
      animate={{ opacity: todo.done ? 0.6 : 1 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card withBorder padding="md">
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Checkbox
            checked={todo.done}
            disabled={toggleTodo.isPending}
            onChange={() => toggleTodo.mutate(todo._id)}
            label={
              <>
                <Text
                  fw={500}
                  td={todo.done ? "line-through" : undefined}
                  c={todo.done ? "dimmed" : undefined}
                >
                  {todo.title}
                </Text>
                {todo.description && (
                  <Text size="sm" c="dimmed">
                    {todo.description}
                  </Text>
                )}
              </>
            }
          />
          <Group gap="xs" wrap="nowrap">
            <Button variant="light" size="xs" onClick={openEdit}>
              Edit
            </Button>
            <Button
              variant="light"
              color="red"
              size="xs"
              loading={deleteTodo.isPending}
              onClick={() => deleteTodo.mutate(todo._id)}
            >
              Delete
            </Button>
          </Group>
        </Group>

        {editOpened && (
          <EditTodoModal todo={todo} opened={editOpened} onClose={closeEdit} />
        )}
      </Card>
    </motion.div>
  );
}
