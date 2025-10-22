# I Got Next Frontend

React + TypeScript single-page application for the I Got Next mentoring and media platform. The UI supports mentors, mentees, artists, writers, and admins, handles article publishing, session scheduling, real-time video calls, announcements, and Stripe-backed payments via a constellation of backend microservices.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Sass Compilation](#sass-compilation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [State & Data Flow](#state--data-flow)
- [Realtime & Video Sessions](#realtime--video-sessions)
- [Testing](#testing)
- [Styling Guidelines](#styling-guidelines)
- [Docker & Deployment](#docker--deployment)
- [Additional Documentation](#additional-documentation)
- [Troubleshooting](#troubleshooting)

## Features
- Multi-role authentication and dashboards for mentors, mentees, writers, and admins with tailored data cards.
- Article management (compose, edit, categorize, feature) backed by Quill editor and media uploads.
- Mentor discovery and booking flows, including availability scheduling, session approvals, and follow-up notes.
- Stripe integration for session pricing, payment intents, and onboarding flows.
- WebRTC video sessions with access control, TURN/STUN configuration, and recording hooks.
- Announcement system persisted in local storage with modal variants and dismissal tracking.
- Global error handling, HTTP request orchestration, and React Query caching for resilient data fetching.

## Tech Stack
- **Framework**: React 18 with TypeScript, Create React App (react-scripts 5).
- **Routing**: React Router v6.
- **UI**: Material UI (MUI), Framer Motion, Bootstrap utilities.
- **State/Data**: React Contexts, React Query, local storage helpers.
- **Networking**: Axios via custom `useHttp` hook.
- **Realtime**: Socket.IO client, custom queueing hook, `SessionCall` WebRTC wrapper.
- **Formatting**: Sass (compiled to CSS in `src/styles`), Day.js.
- **Payments**: `@stripe/react-stripe-js`, `@stripe/stripe-js`.
- **Content**: React Quill rich text editor, Zod schema helpers.
- **Testing**: Mocha + Chai + ts-node (prototype stage).

## Requirements
- Node.js **v18** (aligned with Docker images). Earlier/later versions may require the `--openssl-legacy-provider` flag.
- Yarn (preferred; repo contains `yarn.lock`). NPM works but will install a parallel `package-lock.json`.
- Local SSL certificates (see `certs/`) if you need HTTPS during development.
- `/etc/hosts` entries for the microservice domains (e.g. `shield.igotnext.local`, `xavier.igotnext.local`, etc.) pointing to your API gateway or mock services.

## Getting Started

### Installation
1. Clone the repository.
2. Copy `.env` or `.env.local` to match your environment (see [Environment Variables](#environment-variables)).
3. Install dependencies:
   ```bash
   yarn install
   ```

### Running the App
The default `yarn start` script launches Sass in watch mode and CRA on port **80** bound to `0.0.0.0`.

- Mac/Linux (requires a port ≥1024 unless you run with sudo):
  ```bash
  PORT=3000 HOST=0.0.0.0 yarn start
  ```
  or edit `package.json` if you always want a different port.

- Windows:
  ```bash
  set PORT=3000 && yarn start
  ```

The dev server reloads on file changes and proxies API calls based on the configured env URLs.

### Sass Compilation
Sass is compiled from `src/styles/scss` into plain CSS inside `src/styles`.

- `yarn sass` – one-off compilation.
- `yarn sass:watch` – continuous compilation (this runs automatically inside `yarn start`, but you can run it standalone if needed).

## Environment Variables
All configuration lives under the CRA `REACT_APP_` namespace and is inlined at build time. Never commit live secrets; rotate and inject them via your runtime environment or secret manager.

| Variable | Purpose |
| --- | --- |
| `REACT_APP_ENVIRONMENT`, `REACT_APP_DOMAIN`, `HTTPS`, `SSL_*` | CRA runtime flags, certificate paths for local HTTPS. |
| `REACT_APP_AUTH_API`, `REACT_APP_AUTH_REFRESH_API_URL` | Shield authentication endpoints (login verification, refresh token). |
| `REACT_APP_REGISTER_API`, `REACT_APP_USER_API_URI` | User onboarding and profile management (Shield service). |
| `REACT_APP_LOGIN_API`, `REACT_APP_LOGOUT_API` | Session lifecycle endpoints. |
| `REACT_APP_FEATURE_SUBMISSIONS`, `REACT_APP_GOALS_API`, `REACT_APP_SPECIALTIES_API`, `REACT_APP_GENRE_API`, `REACT_APP_SCHEDULE_API`, `REACT_APP_CATEGORIES_API`, `REACT_APP_TAGS_API` | Additional Shield-backed resources (feature requests, taxonomies). |
| `REACT_APP_ARTICLES_API` | Guardians service for article CRUD and listing. |
| `REACT_APP_MENTOR_API`, `REACT_APP_MENTEES_API`, `REACT_APP_SESSION_API`, `REACT_APP_GENERATE_MEETING_LINK_API` | Xavier service for mentor/mentee data and session scheduling. |
| `REACT_APP_NOTES_API`, `REACT_APP_VIDEO_CALL_API`, `REACT_APP_COMMUNICATIONS_BACKEND`, `REACT_APP_SIGNALING_URL` | Fury service for notes, WebRTC signaling, Socket.IO namespace. |
| `REACT_APP_MEDIA_API` | Asgard media uploads (image hosting, signed URLs). |
| `REACT_APP_PRODUCT_API`, `REACT_APP_PAYMENT_API`, `REACT_APP_BASE_PAYMENT_API` | Starlord service for products, payments, and Stripe onboarding. |
| `REACT_APP_STRIPE_API_PUBLISHABLE_KEY`, `REACT_APP_STRIPE_API_SECRET_KEY` | Stripe credentials (store securely, replace test keys in production). |
| `REACT_APP_SECURE_SERCET_KEY_STORAGE` | Crypto key for local encrypted storage. |
| `REACT_APP_TURN_URL`, `REACT_APP_TURN_USERNAME`, `REACT_APP_TURN_CREDENTIAL` | TURN server configuration for video calls (optional fallback). |

Create environment-specific files:
- `.env` for shared defaults.
- `.env.local` for local overrides (gitignored).
- `.env.production` for production builds (copied in Dockerfile.dev).

## Project Structure
```text
IGNFrontend/
├── public/               # Static CRA assets
├── src/
│   ├── App.tsx           # Route registration and composition
│   ├── components/       # Reusable UI building blocks (articles, dashboards, modals, etc.)
│   ├── contexts/         # React contexts (User, Error, Editor, FileUpload, etc.)
│   ├── customhooks/      # Hooks (HTTP client, sockets, analytics, etc.)
│   ├── forms/            # Form components and builders (mentor onboarding, announcements)
│   ├── pages/            # Route-level pages (dashboards, auth, mentors, sessions, static content)
│   ├── providers/        # Context providers (Query client, announcement state)
│   ├── sockets/          # WebRTC signaling (`SessionCall`, socket events)
│   ├── styles/           # Compiled CSS
│   ├── styles/scss/      # Sass sources
│   ├── tests/            # Mocha prototype tests
│   ├── types/            # Reusable TypeScript types and enums
│   └── utils/            # Helpers (ProtectedRoute, formatters, validators)
├── certs/                # Local development cert/key pair
├── Dockerfile*           # Node build and NGINX runtime images
├── nginx.conf            # SPA-friendly NGINX config
├── notes.md              # Running backlog and TODOs
└── startapp.sh           # Convenience script for Docker dev workflow
```

## State & Data Flow
- **Context Providers**: `UserProvider`, `ErrorProvider`, `AnnouncementsProvider`, etc., wrap the app in `App.tsx`. They centralize auth tokens, error surfacing, and UI-wide state.
- **React Query**: Handles caching and background refresh of mentors, artists, session data, and verification calls; hooks live in contexts and pages.
- **Local Storage Helpers**: `storage/LocalStorage.ts` wraps the browser API with JSON parsing, encryption hooks, and versioning; used for announcement dismissal, saved users, cached specialties.
- **HTTP Layer**: `useHttp` builds an Axios client with optional auth headers and helpers for REST verbs.

## Realtime & Video Sessions
- Socket.IO client is configured in `src/socket.ts`, with rooms joined in `useSocket`.
- `SessionCall` orchestrates WebRTC connections, fetches ICE servers (`APP_ENDPOINTS.VIDEOCALL.ICE_SERVERS`), validates session access, and exposes recording callbacks.
- Ensure `REACT_APP_SIGNALING_URL` and TURN credentials are set in environments that need NAT traversal.
- Session access is tightly checked against booking windows (start time minus 15 minutes, session_limit, booking status).

## Testing
- `yarn test` runs Mocha with ts-node (`src/tests/**/*.test.ts`). Current tests are stubs/commented scaffolding; expand them when building coverage.
- `yarn test:watch` falls back to CRA’s Jest runner if you prefer that workflow (keep in mind CRA expects `.test.tsx` files under `src`).
- Custom reporter (`myCustomReporter.js`) demonstrates colored CLI output; plug it into Mocha with `--reporter ./myCustomReporter.js` if desired.

## Styling Guidelines
- Prefer Sass modules in `src/styles/scss`. Keep compiled CSS out of Git where possible.
- Material UI theming is centralized in `src/theme.d.ts`; extend via providers when customizing palette/typography.
- Existing components make use of both MUI and bespoke Sass; be consistent within a component to avoid cascade conflicts.

## Docker & Deployment
- `Dockerfile`: Development image (Node 18, CRA dev server, port 3000).
- `Dockerfile.dev`: Multi-stage build (Node 18 build → NGINX serve) using `.env.production`.
- `Dockerfile.prod`: Same as `Dockerfile.dev` but copies `.env.development` (verify this matches your intended prod config).
- `startapp.sh`: Convenience script that builds the main `Dockerfile` and runs the container with live volume mount.
- Production deployments should use the multi-stage approach (`docker build -f Dockerfile.dev -t ign-frontend .`) and front the container with HTTPS and microservice domain DNS records.

## Additional Documentation
- `notes.md`: High/low priority TODOs, backlog, and known issues.
- `audit.md`: Security/compliance audit checklist (if populated).
- `checklist.md`: Release or QA checklists.
- `flows.md`: High-level user flow seeds.

## Troubleshooting
- **Port 80 binding**: CRA defaults to port 80; override with `PORT=3000` if you lack elevated privileges.
- **Microservice access**: Ensure `.local` domains resolve to the correct gateway or run a local mock. Missing domains will surface as CORS/network errors.
- **Token refresh**: `UserProvider` aggressively refreshes tokens on mount. If refresh fails you’ll be logged out—watch the Shield auth logs.
- **Announcements**: Demo data seeds local storage. Clear `localStorage["announcements.v1"]` if you need to reset the modal.
- **Sass build errors**: Make sure the `sass` binary is available; `yarn install` pulls Dart Sass via the `sass` package.

---

> Replace any placeholder secrets in `.env*` before shipping to production, and keep real credentials out of version control.
