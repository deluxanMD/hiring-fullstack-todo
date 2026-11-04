import { Router } from "express";
import { createTodo, getTodos } from "../controllers/todo.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createTodoSchema } from "../validators/todo.validator.js";

export const todoRouter = Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", validate(createTodoSchema), createTodo);
