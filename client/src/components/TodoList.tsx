import { Alert, Card, Center, Loader, Text } from "@mantine/core";
import { AnimatePresence, motion } from "motion/react";
import { useTodos } from "../hooks/useTodos";
import type { TodoFilter } from "../types/todo";
import { TodoItem } from "./TodoItem";

const EMPTY_MESSAGES: Record<TodoFilter, string> = {
  all: "No todos yet. Add your first one above.",
  pending: "Nothing pending. You're all caught up!",
  completed: "No completed tasks yet.",
};

export function TodoList({ filter }: { filter: TodoFilter }) {
  const { data, isLoading, error } = useTodos();

  const todos = data?.filter((todo) =>
    filter === "all" ? true : filter === "completed" ? todo.done : !todo.done,
  );

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
      <motion.div
        key={filter}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Text c="dimmed" ta="center" py="xl">
          {EMPTY_MESSAGES[filter]}
        </Text>
      </motion.div>
    );
  }

  return (
    <Card withBorder padding={0} radius="lg" shadow="sm">
      <AnimatePresence mode="popLayout" initial={false}>
        {todos.map((todo) => (
          <motion.div
            key={todo._id}
            className="todo-item"
            layout
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <TodoItem todo={todo} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Card>
  );
}
