import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Collapse,
  Group,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useCreateTodo } from "../hooks/useTodos";
import { todoFormSchema, type TodoFormValues } from "../schemas/todo.schema";

export function TodoForm() {
  const createTodo = useCreateTodo();
  const [focused, setFocused] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: { title: "", description: "" },
  });

  const [title, description] = useWatch({
    control,
    name: ["title", "description"],
  });
  const expanded = focused || title !== "" || description !== "";

  const onSubmit = (values: TodoFormValues) => {
    createTodo.mutate(
      { title: values.title, description: values.description || undefined },
      { onSuccess: () => reset() },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
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
            error={errors.title?.message}
            {...register("title")}
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
            error={errors.description?.message}
            {...register("description")}
          />
        </Collapse>
      </Stack>
    </form>
  );
}
