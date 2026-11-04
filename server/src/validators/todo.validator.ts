import { z } from "zod";

const todoBody = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional(),
});

export const createTodoSchema = z.object({
  body: todoBody.extend({ done: z.boolean().optional() }),
});

export const updateTodoSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid todo id"),
  }),
  body: todoBody,
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
