# Todo App

A full-stack todo application with an animated React interface and a REST API backed by MongoDB. It is an npm workspaces monorepo with two packages:

| Package              | Description                                | Docs                                   |
| -------------------- | ------------------------------------------ | -------------------------------------- |
| [`client`](./client) | React + TypeScript single-page app (Vite)  | [client/README.md](./client/README.md) |
| [`server`](./server) | Express + TypeScript REST API with MongoDB | [server/README.md](./server/README.md) |

## Features

- Create, edit, complete and delete todos, each with a title and an optional description
- Filter by **All**, **Pending** or **Completed**, with a live "tasks left" count
- **Clear completed** removes every finished todo in one click
- Form validation with `react-hook-form` and `zod`, with friendly inline error messages
- Animated list (items slide in and out, and the rest glide into place) using Motion
- Toast notifications for successes and API errors
- Light and dark mode that follows the system setting

## Tech stack

**Client:** React 19, TypeScript, Vite, Mantine, TanStack Query, react-hook-form, zod, Motion

**Server:** Node.js, Express 5, TypeScript, Mongoose (MongoDB), zod

## Prerequisites

- [Node.js](https://nodejs.org/) 22 or later (and npm)
- A MongoDB database: either a local instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## Getting started

1. **Install dependencies** (installs both workspaces from the repo root):

   ```bash
   npm install
   ```

2. **Configure the server environment.** Create `server/.env.dev` for development:

   ```bash
   cp server/.env.example server/.env.dev
   ```

   Then set `MONGODB_URI` to your database. See [server/README.md](./server/README.md#environment-variables) for details.

3. **Start both apps** in development mode:

   ```bash
   npm run dev
   ```

   | Service | URL                       |
   | ------- | ------------------------- |
   | Client  | http://localhost:5173     |
   | API     | http://localhost:4000/api |

   The client dev server proxies `/api` requests to the API, so no extra configuration or CORS setup is needed.

## Scripts

Run these from the repo root:

| Command         | What it does                                       |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Starts the API and the client together             |
| `npm run build` | Type-checks and builds the server, then the client |
| `npm run lint`  | Lints the client                                   |

Each package also has its own scripts. See its README.

## Project structure

```
.
├── client/          # React app (Vite)
│   └── src/
│       ├── api/         # fetch wrappers for the REST API
│       ├── components/  # UI components
│       ├── hooks/       # TanStack Query hooks
│       ├── schemas/     # zod schemas shared by the forms
│       └── types/
├── server/          # Express API
│   └── src/
│       ├── config/      # env loading and database connection
│       ├── controllers/
│       ├── http/        # ready-to-run REST Client requests
│       ├── middleware/  # validation and error handling
│       ├── models/      # Mongoose models
│       ├── routes/
│       └── validators/  # zod request schemas
└── package.json     # workspace root
```

## API overview

All endpoints are under `/api`.

| Method   | Path                  | Description                           |
| -------- | --------------------- | ------------------------------------- |
| `GET`    | `/api/health`         | Health check                          |
| `GET`    | `/api/todos`          | List all todos, newest first          |
| `POST`   | `/api/todos`          | Create a todo                         |
| `PUT`    | `/api/todos/:id`      | Update a todo's title and description |
| `PATCH`  | `/api/todos/:id/done` | Toggle a todo's done status           |
| `DELETE` | `/api/todos/:id`      | Delete a todo                         |

Request and response details are in [server/README.md](./server/README.md#api-reference).

## Notes

- Environment files (`server/.env` and `server/.env.*`) are git-ignored. Only `server/.env.example` is committed.
- The client calls the API with relative `/api/...` URLs. In development the Vite proxy handles this. For a production deployment, serve the built client and the API from the same origin, or put a reverse proxy in front of them.
