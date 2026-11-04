import type { RequestHandler } from "express";
import { TodoModel } from "../models/todo.model.js";
import type { CreateTodoInput } from "../validators/todo.validator.js";

export const getTodos: RequestHandler = async (_req, res) => {
  const todos = await TodoModel.find().sort({ createdAt: -1 });
  res.json(todos);
};

export const createTodo: RequestHandler = async (_req, res) => {
  const { body } = res.locals.validated as CreateTodoInput;
  const todo = await TodoModel.create(body);
  res.status(201).json(todo);
};
