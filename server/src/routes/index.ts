import { Router } from "express";
import { todoRouter } from "./todo.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

apiRouter.use("/todos", todoRouter);
