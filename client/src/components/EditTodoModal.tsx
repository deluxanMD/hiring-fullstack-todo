import { Button, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { useState, type SubmitEvent } from "react";
import { useUpdateTodo } from "../hooks/useTodos";
import type { Todo } from "../types/todo";

interface EditTodoModalProps {
  todo: Todo;
  opened: boolean;
  onClose: () => void;
}

export function EditTodoModal({ todo, opened, onClose }: EditTodoModalProps) {
  const updateTodo = useUpdateTodo();
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description ?? "");
  const [titleError, setTitleError] = useState<string | null>(null);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }

    updateTodo.mutate(
      {
        id: todo._id,
        title: title.trim(),
        description: description.trim(),
      },
      { onSuccess: onClose },
    );
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit todo" centered>
      <form onSubmit={handleSubmit}>
        <Stack gap="sm">
          <TextInput
            label="Title"
            value={title}
            error={titleError}
            data-autofocus
            onChange={(event) => {
              setTitle(event.currentTarget.value);
              setTitleError(null);
            }}
          />
          <Textarea
            label="Description"
            autosize
            minRows={2}
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
          <Button type="submit" loading={updateTodo.isPending}>
            Save changes
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
