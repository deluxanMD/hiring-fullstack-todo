import {
  Button,
  Collapse,
  Group,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useState, type SubmitEvent } from "react";
import { useCreateTodo } from "../hooks/useTodos";

export function TodoForm() {
  const createTodo = useCreateTodo();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  // The description stays tucked away until the user starts a new task,
  // which keeps the add bar as clean as the design.
  const expanded = focused || title !== "" || description !== "";

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }

    createTodo.mutate(
      {
        title: title.trim(),
        description: description.trim() || undefined,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
    >
      <Stack gap="sm">
        <Group align="flex-start" wrap="nowrap" gap="sm">
          <TextInput
            flex={1}
            size="lg"
            radius="lg"
            aria-label="New task"
            placeholder="Add a task and press Enter"
            leftSection={<span style={{ fontSize: 22, lineHeight: 1 }}>+</span>}
            value={title}
            error={titleError}
            onChange={(event) => {
              setTitle(event.currentTarget.value);
              setTitleError(null);
            }}
          />
          <Button
            type="submit"
            size="lg"
            radius="lg"
            loading={createTodo.isPending}
          >
            Add
          </Button>
        </Group>
        <Collapse expanded={expanded}>
          <Textarea
            radius="lg"
            aria-label="Description"
            placeholder="Add a description (optional)"
            autosize
            minRows={2}
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </Collapse>
      </Stack>
    </form>
  );
}
