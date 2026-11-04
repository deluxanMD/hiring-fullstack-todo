# Todo App (client)

The React front end for the todo app, built with Vite and TypeScript. It talks to the REST API in [`../server`](../server/README.md).

## Tech stack

| Purpose            | Library                                                                      |
| ------------------ | ---------------------------------------------------------------------------- |
| Framework / build  | React 19, TypeScript, Vite                                                   |
| UI components      | [Mantine](https://mantine.dev/) (`core`, `hooks`, `notifications`)           |
| Server state       | [TanStack Query](https://tanstack.com/query)                                 |
| Forms & validation | [react-hook-form](https://react-hook-form.com/) with [zod](https://zod.dev/) |
| Animation          | [Motion](https://motion.dev/) (`motion/react`)                               |

## Getting started

Install dependencies once from the **repository root**, since this is an npm workspace:

```bash
npm install
```

Then start the client:

```bash
npm run dev -w client
```

It runs at http://localhost:5173. The API must be running too (`npm run dev` at the repo root starts both). See the [root README](../README.md) for the full setup.

### API access

The client calls relative URLs such as `/api/todos`. In development, the Vite dev server proxies `/api` to `http://localhost:4000` (configured in [`vite.config.ts`](./vite.config.ts)), so no environment variables or CORS settings are needed.

For production, serve the built files and the API from the same origin, or put a reverse proxy in front of both. The proxy setting only applies to the dev server.

## Scripts

| Command           | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Starts the Vite dev server with hot reload        |
| `npm run build`   | Type-checks with `tsc -b`, then builds to `dist/` |
| `npm run preview` | Serves the production build locally               |
| `npm run lint`    | Runs ESLint                                       |

Run them from `client/`, or from the root with `-w client`.

## Project structure

```
src/
├── main.tsx             # entry: Mantine, notifications and React Query providers
├── App.tsx              # page layout and the selected filter
├── api/
│   └── todos.ts         # one fetch function per API endpoint
├── hooks/
│   └── useTodos.ts      # TanStack Query hooks (list and mutations)
├── schemas/
│   └── todo.schema.ts   # zod schema shared by the add and edit forms
├── types/
│   └── todo.ts          # Todo, TodoInput and TodoFilter types
├── components/
│   ├── TodoHeader.tsx       # date, title and "X of Y completed"
│   ├── TodoForm.tsx         # add form (title plus collapsible description)
│   ├── TodoFilterBar.tsx    # All / Pending / Completed and "tasks left"
│   ├── TodoList.tsx         # animated list in a single card
│   ├── TodoItem.tsx         # one row: checkbox, text, edit and delete icons
│   ├── EditTodoModal.tsx    # edit dialog
│   ├── TodoFooter.tsx       # hint and "Clear completed"
│   └── icons.tsx            # inline SVG icons
└── index.css            # page background and row hover styles
```

## How it works

### Data flow

1. `api/todos.ts` wraps `fetch` in a small `request` helper. It sends JSON, and for non-OK responses it throws an `Error` carrying the server's `error` message. It also handles the `204` response from `DELETE`.
2. `hooks/useTodos.ts` turns those functions into TanStack Query hooks. `useTodos()` loads the list under the `['todos']` key. Every mutation hook invalidates that key on success, so the list refreshes by itself, and shows a toast on success or failure.
3. Components only call the hooks. They never call `fetch` directly.

The API has no bulk delete, so **Clear completed** sends one `DELETE` request per completed todo. If some fail, the list still refreshes and a toast reports how many failed.

### Filtering

The All, Pending and Completed filter runs in the browser, on the list already loaded. The selected filter lives in `App.tsx`, and the header and filter bar count todos from the same cached query.

### Forms and validation

The add form and the edit dialog both use `react-hook-form` with `zodResolver` and the single schema in `schemas/todo.schema.ts`:

| Field         | Rules                                     |
| ------------- | ----------------------------------------- |
| `title`       | Required, trimmed, at most 100 characters |
| `description` | Optional, trimmed, at most 500 characters |

Change a rule in that one file and both forms follow. Error messages appear under the field. The server validates the same input again, since it never trusts the client. It does not enforce the maximum lengths.

### Animation

- The heading fades in on load.
- Todos slide in when added. When one is deleted it slides out and the rest glide up to close the gap (`AnimatePresence` with the `layout` prop in `TodoList.tsx`).
- Completed todos fade smoothly.
- The description box in the add form expands when you focus the form.

### Theming

`MantineProvider` uses `defaultColorScheme="auto"`, so the app follows the system light or dark setting. The grey page background in `index.css` applies in light mode only. Edit and delete icons appear on row hover or keyboard focus, and are always visible on touch devices.

## Linting and types

ESLint is configured in [`eslint.config.js`](./eslint.config.js) with the TypeScript, React Hooks and React Refresh rules. The build runs the TypeScript compiler (`tsc -b`) before Vite, so type errors fail the build.
