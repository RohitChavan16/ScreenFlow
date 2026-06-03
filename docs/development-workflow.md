# Development Workflow

ScreenFlow is organized to support collaborative engineering, clear feature delivery, and maintainable iteration.

## Repository Structure

- `client/` — frontend application, UI components, page routes, and context providers.
- `server/` — backend API, controllers, models, middleware, cron jobs, and configuration.
- `docs/` — design documentation, architecture notes, operation guides, and deployment strategies.

## Local Developer Setup

1. Clone the repository.
2. Install backend dependencies in `server/`.
3. Install frontend dependencies in `client/`.
4. Configure environment variables for backend and frontend.
5. Run backend and frontend concurrently during local development.

## Branching Strategy

- Use feature branches for individual improvements: `feature/<description>`.
- Use `fix/<description>` for patching bugs.
- Use `docs/<description>` for documentation updates.
- Keep PR scope clear and aligned with a single theme: API, UI, architecture, or ops.

## Code Quality

- Preserve strong module separation between backend controllers, middleware, and route definitions.
- Maintain clear contract definitions in the API reference.
- Keep frontend state in context providers and avoid global mutation.
- Use consistent naming and comments for operational code paths such as webhook handling and cron cleanup.

## Collaboration

- Document API expectations before adding new endpoints.
- Capture architecture decisions in the `docs/` folder.
- Review PRs for security boundaries, especially around auth and payment flows.

## Release Notes

- Include deployment notes in `docs/deployment.md` when releasing new platform behavior.
- Track environment variables and operational changes in the same document set.
