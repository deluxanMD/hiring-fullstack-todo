import { Container, Stack } from "@mantine/core";
import { motion } from "motion/react";
import { useState } from "react";
import type { TodoFilter } from "./types/todo";
import { TodoFilterBar } from "./components/TodoFilterBar";
import { TodoForm } from "./components/TodoForm";
import { TodoHeader } from "./components/TodoHeader";
import { TodoList } from "./components/TodoList";

function App() {
  const [filter, setFilter] = useState<TodoFilter>("all");

  return (
    <Container size={540} py={80}>
      <Stack gap="xl">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TodoHeader />
        </motion.div>
        <TodoForm />
        <TodoFilterBar value={filter} onChange={setFilter} />
        <TodoList filter={filter} />
      </Stack>
    </Container>
  );
}

export default App;
