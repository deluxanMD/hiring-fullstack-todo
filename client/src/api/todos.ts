import type { Todo, TodoInput } from "../types/todo";

const BASE_URL = "/api/todos";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed (${res.status})`);
  }

  return (res.status === 204 ? undefined : await res.json()) as T;
}

export const getTodos = () => {
  return request<Todo[]>("");
};

export const createTodo = (input: TodoInput) => {
  return request<Todo>("", {
    method: "POST",
    body: JSON.stringify(input),
  });
};

export const updateTodo = (id: string, input: TodoInput) => {
  return request<Todo>(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
};

export const toggleTodo = (id: string) => {
  return request<Todo>(`/${id}/done`, {
    method: "PATCH",
  });
};

export const deleteTodo = (id: string) => {
  return request<void>(`/${id}`, {
    method: "DELETE",
  });
};
