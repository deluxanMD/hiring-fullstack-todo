import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validators/todo.validator.js";

export const todoRouter = Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", validate(createTodoSchema), createTodo);
todoRouter.put("/:id", validate(updateTodoSchema), updateTodo);
