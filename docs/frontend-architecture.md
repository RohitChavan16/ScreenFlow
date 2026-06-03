# Frontend Architecture

The frontend is a route-driven React application built with Vite, designed to provide a responsive cinema booking experience and an admin dashboard.

## Application Structure

- `client/src/App.jsx` — defines public and admin routes, and conditionally renders shared layout components.
- `client/src/context/AppContext.jsx` — central auth and user state provider for session validation and profile data.
- `client/src/context/MovieContext.jsx` — data orchestration for show listings, admin status checks, and favorite movies.
- `client/src/pages/` — page-level routes for home, movies, booking, admin dashboard, and user workflows.
- `client/src/components/` — reusable UI components, seat layout interaction, admin sidebar, and loading states.

## Frontend State Design

- **Auth state**: `AppContext` verifies the token on app boot and fetches user profile state via `/api/auth/is-auth`.
- **Show state**: `MovieContext` loads available shows and drives list rendering across the public and admin views.
- **Admin state**: `MovieContext` checks `/api/admin/is-admin` to enable admin-specific routes and controls.
- **Favorites**: favorites are managed as a user-level collection through `/api/user/favorites` and updated via `updateFavorite`.

## Workflow Patterns

- **Seat booking**: seat selection is validated on the backend; the frontend presents seat availability and recommendation results.
- **Payment redirect**: checkout sessions are created in the backend and the frontend redirects users to the Stripe hosted checkout.
- **Email verification / reset**: auth flows are managed through user endpoints with OTP workflows.
- **Admin dashboard**: nested routing in `App.jsx` isolates admin UI from customer-facing pages.

## UX and Operational Awareness

- The frontend uses `react-hot-toast` and `react-toastify` for operational feedback and error reporting.
- Admin routes are protected by both frontend route structure and backend authorization middleware.
- The app maintains a strong operational view by surfacing booking and show state transitions as users interact with the platform.

## Future Frontend Evolution

- Evolve state management into a typed query cache for offline-first UX and better cache consistency.
- Add telemetry for route performance, API latency, and user journey metrics.
- Expand admin tooling for show lifecycle management, performance analytics, and release staging.
