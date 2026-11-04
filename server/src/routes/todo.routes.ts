import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoDone,
  updateTodo,
} from "../controllers/todo.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createTodoSchema,
  todoIdSchema,
  updateTodoSchema,
} from "../validators/todo.validator.js";

export const todoRouter = Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", validate(createTodoSchema), createTodo);
todoRouter.put("/:id", validate(updateTodoSchema), updateTodo);
todoRouter.patch("/:id/done", validate(todoIdSchema), toggleTodoDone);
todoRouter.delete("/:id", validate(todoIdSchema), deleteTodo);
