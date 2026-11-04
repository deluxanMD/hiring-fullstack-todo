import { Alert, Center, Loader, Stack, Text } from "@mantine/core";
import { AnimatePresence, motion } from "motion/react";
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Text c="dimmed" ta="center" py="xl">
          No todos yet. Add your first one above.
        </Text>
      </motion.div>
    );
  }

  return (
    <Stack gap="sm">
      <AnimatePresence mode="popLayout" initial={false}>
        {todos.map((todo) => (
          <motion.div
            key={todo._id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <TodoItem todo={todo} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Stack>
  );
}
