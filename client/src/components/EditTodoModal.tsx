import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useUpdateTodo } from "../hooks/useTodos";
import { todoFormSchema, type TodoFormValues } from "../schemas/todo.schema";
import type { Todo } from "../types/todo";

interface EditTodoModalProps {
  todo: Todo;
  opened: boolean;
  onClose: () => void;
}

export function EditTodoModal({ todo, opened, onClose }: EditTodoModalProps) {
  const updateTodo = useUpdateTodo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: { title: todo.title, description: todo.description ?? "" },
  });

  const onSubmit = (values: TodoFormValues) => {
    updateTodo.mutate({ id: todo._id, ...values }, { onSuccess: onClose });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit todo" centered>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack gap="sm">
          <TextInput
            label="Title"
            data-autofocus
            error={errors.title?.message}
            {...register("title")}
          />
          <Textarea
            label="Description"
            autosize
            minRows={2}
            error={errors.description?.message}
            {...register("description")}
          />
          <Button type="submit" loading={updateTodo.isPending}>
            Save changes
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
