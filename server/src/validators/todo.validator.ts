import { z } from "zod";

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().optional(),
    done: z.boolean().optional(),
  }),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
