# Scaling Strategy

ScreenFlow is designed as a platform that can grow from a developer prototype into an operationally oriented booking system.

## Scaling Principles

- **Separation of concerns**: booking, payment, email, and admin services are logically isolated.
- **Decoupled workflows**: payment confirmation is handled asynchronously via Stripe webhooks.
- **Data locality**: show occupancy and booking state are collocated for efficient seat reserve operations.
- **Operational automation**: a cron worker ensures stale reservations do not exhaust capacity.

## Current Scalability Posture

- `Show.occupiedSeats` supports fast seat availability checks and can scale to moderate traffic without a separate seat reservation store.
- `Booking` records are append-only for paid bookings and transient for holds, enabling the cleanup worker to keep live capacity accurate.
- `Movie` metadata is cached in MongoDB after TMDB ingestion, reducing repeated external fetch costs.

## Growth Paths

### Horizontal Scaling
- Add stateless backend instances behind a load balancer.
- Use MongoDB Atlas with read replicas and sharding.
- Move webhook handling and email delivery into dedicated worker services.

### Vertical Scaling
- Add caching layers for show metadata and occupancy snapshots.
- Use Redis for session state or rate limiting.
- Optimize read-optimized query patterns for admin dashboards.

### Operational Scaling
- Introduce a queue for booking reservation reconciliation.
- Segment admin workloads into analytics and operational routes.
- Add API rate limiting for public endpoints and booking workflows.

## Future Distributed Architecture

- A distributed worker layer can handle:
  - `Stripe` event processing
  - email notifications
  - show ingestion from TMDB
  - cleanup and seat release operations
- This architecture enables a production-grade operational model without altering the core API contract.
