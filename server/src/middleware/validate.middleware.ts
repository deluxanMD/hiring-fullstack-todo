import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validate =
  (schema: ZodType): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      next(result.error);
      return;
    }

    res.locals.validated = result.data;
    next();
  };
