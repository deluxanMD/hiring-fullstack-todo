import { Container, Stack, Title } from "@mantine/core";
import { motion } from "motion/react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title order={1}>Todos</Title>
        </motion.div>
        <TodoForm />
        <TodoList />
      </Stack>
    </Container>
  );
}

export default App;
