# Monitoring & Observability

ScreenFlow is built with operational awareness in mind, surfacing both runtime state and asynchronous workflows.

## Operational Signals

- **API status**: core endpoints expose a consistent success/failure payload structure.
- **Stripe webhook processing**: webhook handling is isolated for payment finalization and email issuance.
- **Background cleanup**: cron-driven seat release logs operational cleanup events.
- **Email delivery**: notification success and failure are logged via the email utility.

## Observability Patterns

- **Log-driven visibility**: backend log messages are intentionally descriptive for booking, webhook, and cleanup flows.
- **Event tracing**: Stripe payment events are the anchor point for booking state transitions.
- **Health checks**: `server.js` exposes a root route and MongoDB readiness check via startup logs.

## Recommended Monitoring Enhancements

- Add application-level metrics for request latency, error rates, and checkout conversion.
- Track seat release frequency and expired booking counts for capacity planning.
- Add telemetry for admin dashboard usage and show creation activity.
- Monitor email delivery success/failure rates for operational confidence.

## Observability Roadmap

- Integrate centralized log aggregation for backend logs.
- Add metrics export for API latency, auth failures, and payment webhook processing.
- Add alerting on cron job errors and MongoDB connectivity failures.
- Build a lightweight operational dashboard for booking queue health, show availability, and admin activity.
