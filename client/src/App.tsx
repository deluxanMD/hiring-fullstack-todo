import { Container, Stack, Title } from "@mantine/core";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <Title order={1}>Todos</Title>
        <TodoForm />
        <TodoList />
      </Stack>
    </Container>
  );
}

export default App;
