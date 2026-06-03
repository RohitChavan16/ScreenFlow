# Contributing Guide

ScreenFlow is structured to support disciplined contributions, clear architecture collaboration, and production-oriented engineering standards.

## How to Contribute

1. Fork the repository.
2. Create a branch: `git checkout -b feature/<short-description>`.
3. Make your changes with minimal scope and strong tests.
4. Update documentation in `docs/` if the change affects architecture, deployment, API, or operations.
5. Open a Pull Request with a clear summary and the engineering rationale.

## Contribution Standards

- Prefer small, focused PRs.
- Align code changes with the repository's architecture goals.
- Add or update documentation for any API, deployment, or operational changes.
- Use descriptive commit messages.
- Keep backend and frontend responsibilities separated.

## Review Expectations

- Reviewers should verify auth and admin boundaries for any API changes.
- Ensure new endpoints are documented in `docs/api-reference.md`.
- Confirm any new environment variables are added to `docs/deployment.md`.
- Validate that the frontend uses context providers responsibly and avoids leaked auth state.

## Project Standards

- `docs/` is the source of truth for architecture and operations.
- API surfaces should be stable and documented before consumption.
- Deployments should be repeatable via environment configuration.
- Production-ready evolution should preserve performance, scalability, and observability.

## Reporting Issues

- Open an issue for bugs, feature ideas, or architectural improvements.
- Include reproduction context and expected behavior.
- Reference supporting documentation when possible.

## Engineering Mindset

ScreenFlow is positioned as a production-inspired system. Contributions should reinforce:

- operational visibility
- engineering maturity
- backend-driven workflows
- architecture-aware design
