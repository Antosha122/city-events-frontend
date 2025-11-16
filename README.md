# City Events Frontend

React + Vite application for browsing city events, authenticating users, and creating your own events.

## Features

- Events list page (`/events`)
- Authentication page (`/auth`) with Login and Register tabs
- Profile page (`/profile`) showing your email, role, and your created events
- Create event page (`/events/add`) with category, location, date/time selection
- Conditional navigation based on auth state (Profile and Add Event only when logged in)

## Tech Stack

- React 19 + Vite
- React Router DOM
- Tailwind CSS
- Axios
- ESLint

## Project Structure

```
src/
  api/           # axios calls (events, meta, auth, users)
  auth/          # simple token storage util
  components/    # shared UI components (Header, EventCard, ...)
  pages/         # route pages (EventsList, AddEvent, Auth, Profile)
```

## API Expectations

The app assumes a backend at `http://localhost:8080`.

- Auth
  - `POST /auth/login` → `{ token, ... }`
  - `POST /auth/register` → `{ token, ... }`
  - `GET /auth/me` → `{ email, role, id, ... }`
- Events
  - `GET /events/` → `Event[]`
  - `GET /events/mine` → `Event[]` for the authenticated user
  - `POST /events/new` → creates an event
- Meta
  - `GET /categories` → `{ categories: Category[] }`
  - `GET /locations` → `{ locations: Location[] }`

If your endpoints or response fields differ, update the corresponding functions in `src/api/` and (optionally) the token handling in `src/auth/storage.js`.

## Auth Handling

- On successful login/register, the app expects a `token` field and stores it in `localStorage`.
- Navigation reacts to auth changes; protected pages redirect to `/auth` when not logged in.
- To customize, see `src/auth/storage.js` and `src/pages/Auth.jsx`.

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Run the development server
   ```bash
   npm run dev
   ```
3. Open the app and ensure your backend is available at `http://localhost:8080`.

## Environment / Configuration

The API base URL is currently hardcoded as `http://localhost:8080` in the API modules. For production, consider moving it to an environment variable.

## Available Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview built app
- `npm run lint` – run ESLint

## Notes

- The Add Event and Profile pages are protected; unauthenticated users are redirected to `/auth`.
- Event detail navigation is wired in `EventCard` (`/events/:id`). If you add the detail route, connect it in `src/App.jsx`.
