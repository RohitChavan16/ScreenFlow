# Performance Optimization

ScreenFlow applies targeted optimization for booking performance, seat management, and backend responsiveness.

## Implemented Optimizations

- **Seat availability checking**: `Show.occupiedSeats` is stored as an object map to allow constant-time occupancy checks.
- **Batch show creation**: `Show.insertMany()` is used during show creation to reduce insert overhead.
- **API response shaping**: the show listing endpoints return populated movie data for efficient UI rendering.
- **Async email notifications**: payment finalization and email dispatch are performed in the webhook stage, decoupling booking requests from external delivery latency.
- **Cron cleanup**: the cleanup worker runs every minute to reclaim seats immediately after booking expiry.

## Efficient State Management

- The booking workflow persists a reservation hold before checkout, minimizing race conditions on seat selection.
- Payment confirmation is event-driven, avoiding synchronous checkout dependencies during seat lock time.
- `booking.paymentLink` is cleared after fulfillment to keep the booking document stateful and simple.

## Algorithmic Pathways

- The seat recommendation utility uses a weighted center-distance scoring algorithm to recommend the most desirable available seat.
- The algorithm ensures reserved seats are excluded and returns a single best seat quickly for user convenience.

## Performance Roadmap

- Add Redis to cache show availability and reduce MongoDB load for high-frequency seat checks.
- Introduce request-level instrumentation for query latency tracking.
- Add database indexes for query shapes used by the admin dashboard and booking list views.
- Move email and webhook acknowledgement into dedicated asynchronous workers for stronger throughput.
