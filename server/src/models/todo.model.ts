import { model, Schema, type InferSchemaType } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type Todo = InferSchemaType<typeof todoSchema>;

export const TodoModel = model("Todo", todoSchema);
