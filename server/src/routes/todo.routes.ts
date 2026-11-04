import { Router } from "express";
import { getTodos } from "../controllers/todo.controller.js";

export const todoRouter = Router();

todoRouter.get("/", getTodos);
