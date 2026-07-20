# Todo-list

A small shared to-do web app. Whitelisted Telegram users sign in, track the
tasks assigned to them, and can assign tasks to each other.

This repository is the frontend only. It talks to a separate NestJS backend
([todo_backend](https://github.com/tagirsoliev/todo_backend)) over HTTP.

## How it works

- **Sign in** — the Telegram Login widget returns an OIDC `id_token`. The
  backend verifies it and, if the user is on the whitelist, responds with a JWT
  and the user's profile. Both are kept in React context and sent as a
  `Bearer` token on every request. The session lives in memory only, so a page
  reload signs you out.
- **Tasks** — you see your own outstanding (not-yet-done) tasks. Creating a task
  assigns it to yourself by default, or to another whitelisted user you pick
  from a dropdown. Marking a task done removes it from the list.
- **Feedback** — assigning to someone else raises a toast, failed requests show
  an alert, buttons disable while a request is in flight, and a task someone
  else assigned to you is tagged with their name.

## Tech

Next.js (App Router) · React · TypeScript · Tailwind CSS · [HeroUI](https://www.heroui.com/)

## Running locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The backend must be running
and reachable, and your Telegram user must be on its whitelist to sign in. The
backend's `WEB_ORIGIN` must include the frontend's origin, or requests are
blocked by CORS.
