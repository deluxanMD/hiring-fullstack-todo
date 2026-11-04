import type { RequestHandler } from "express";
import { TodoModel } from "../models/todo.model.js";
import type {
  CreateTodoInput,
  ToggleTodoInput,
  UpdateTodoInput,
} from "../validators/todo.validator.js";

export const getTodos: RequestHandler = async (_req, res) => {
  const todos = await TodoModel.find().sort({ createdAt: -1 });
  res.json(todos);
};

export const createTodo: RequestHandler = async (_req, res) => {
  const { body } = res.locals.validated as CreateTodoInput;
  const todo = await TodoModel.create(body);
  res.status(201).json(todo);
};

export const updateTodo: RequestHandler = async (_req, res) => {
  const { params, body } = res.locals.validated as UpdateTodoInput;

  const todo = await TodoModel.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  res.json(todo);
};

export const toggleTodoDone: RequestHandler = async (_req, res) => {
  const { params } = res.locals.validated as ToggleTodoInput;

  // Pipeline update flips the value atomically, avoiding a read-then-write race.
  const todo = await TodoModel.findByIdAndUpdate(
    params.id,
    [{ $set: { done: { $not: "$done" } } }],
    { new: true, updatePipeline: true },
  );

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  res.json(todo);
};
