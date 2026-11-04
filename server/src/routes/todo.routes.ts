import { Router } from "express";
import {
  createTodo,
  getTodos,
  toggleTodoDone,
  updateTodo,
} from "../controllers/todo.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createTodoSchema,
  toggleTodoSchema,
  updateTodoSchema,
} from "../validators/todo.validator.js";

export const todoRouter = Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", validate(createTodoSchema), createTodo);
todoRouter.put("/:id", validate(updateTodoSchema), updateTodo);
todoRouter.patch("/:id/done", validate(toggleTodoSchema), toggleTodoDone);
