import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import { useState, type SubmitEvent } from "react";
import { useCreateTodo } from "../hooks/useTodos";

export function TodoForm() {
  const createTodo = useCreateTodo();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState<string | null>(null);

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
    <form onSubmit={handleSubmit}>
      <Stack gap="sm">
        <TextInput
          label="Title"
          placeholder="What needs to be done?"
          value={title}
          error={titleError}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
            setTitleError(null);
          }}
        />
        <Textarea
          label="Description"
          placeholder="Optional details"
          autosize
          minRows={2}
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
        <Button type="submit" loading={createTodo.isPending}>
          Add todo
        </Button>
      </Stack>
    </form>
  );
}
