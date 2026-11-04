import type { RequestHandler } from "express";
import { TodoModel } from "../models/todo.model.js";

export const getTodos: RequestHandler = async (_req, res) => {
  const todos = await TodoModel.find().sort({ createdAt: -1 });
  res.json(todos);
};
