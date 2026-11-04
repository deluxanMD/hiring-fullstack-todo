import { ActionIcon, Checkbox, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "motion/react";
import { useDeleteTodo, useToggleTodo } from "../hooks/useTodos";
import type { Todo } from "../types/todo";
import { EditTodoModal } from "./EditTodoModal";
import { PencilIcon, TrashIcon } from "./icons";

export function TodoItem({ todo }: { todo: Todo }) {
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();
  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  return (
    <Group
      className="todo-row"
      px="lg"
      py="md"
      gap="md"
      wrap="nowrap"
      align="center"
    >
      <Checkbox
        size="md"
        radius="md"
        checked={todo.done}
        disabled={toggleTodo.isPending}
        onChange={() => toggleTodo.mutate(todo._id)}
        aria-label={`Mark "${todo.title}" as ${todo.done ? "pending" : "done"}`}
      />

      <motion.div
        animate={{ opacity: todo.done ? 0.55 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ flex: 1, minWidth: 0 }}
      >
        <Text fz="md" td={todo.done ? "line-through" : undefined}>
          {todo.title}
        </Text>
        {todo.description && (
          <Text fz="sm" c="dimmed">
            {todo.description}
          </Text>
        )}
      </motion.div>

      <Group className="todo-actions" gap={4} wrap="nowrap">
        <ActionIcon
          variant="subtle"
          color="gray"
          aria-label={`Edit "${todo.title}"`}
          onClick={openEdit}
        >
          <PencilIcon />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="red"
          aria-label={`Delete "${todo.title}"`}
          loading={deleteTodo.isPending}
          onClick={() => deleteTodo.mutate(todo._id)}
        >
          <TrashIcon />
        </ActionIcon>
      </Group>

      {editOpened && (
        <EditTodoModal todo={todo} opened={editOpened} onClose={closeEdit} />
      )}
    </Group>
  );
}
