# Backend Architecture

ScreenFlow backend is designed as a service-oriented API layer with strong responsibility for data integrity, authorization, transactional seat reservation, and external integration.

## Core Backend Services

- **Authentication**: JWT-based access tokens issued at login and register. Tokens are stored as secure cookies and verified with middleware in `server/middleware/userAuth.js` and `server/middleware/adminAuth.js`.
- **Booking Engine**: `server/controllers/bookingController.js` handles seat availability, reservation, booking creation, and Stripe checkout orchestration.
- **Show & Movie Management**: `server/controllers/showController.js` handles the ingestion of TMDB metadata, show scheduling, and screen availability validation.
- **Admin Analytics**: `server/controllers/adminController.js` delivers dashboard insights, booking summaries, revenue calculations, and check-in token validation.
- **Webhook Processing**: `server/controllers/stripeWebhooks.js` is the event-driven payment finalization stage that triggers email confirmation and QR code issuance.
- **Operational Cleanup**: `server/cron/bookingCleanup.js` frees reserved seats for expired bookings on a regular schedule.

## Data Flow and State Transitions

- **Booking reservation**: when a booking is created, seats are marked on the `Show.occupiedSeats` map and the booking record holds an expiry timestamp.
- **Payment confirmation**: Stripe webhook listens for `payment_intent.succeeded`, updates booking state to `isPaid`, and clears the payment link.
- **Check-in lifecycle**: each paid booking receives a `checkInToken`; admin check-in validates the token and updates `checkedIn` state.
- **Expiration cleanup**: cron job inspects unpaid bookings with `expiresAt <= now`, releases seats, and deletes stale records.

## External Integrations

- **Stripe**: secure payment orchestration via checkout sessions. Stripe metadata associates sessions with booking records.
- **TMDB**: movie metadata ingestion for show creation, including cast, genres, artwork, and runtime.
- **Brevo / SMTP**: email notifications for registration, booking confirmation, and admin announcements.

## Operational Architecture

- `server/server.js` starts the Express API and mounts the webhook route with raw body parsing required for Stripe signature verification.
- `connectDB()` ensures MongoDB is connected before the app starts processing requests.
- Middleware validation surrounds every protected route and enforces user/admin boundaries.

## Architectural Tradeoffs

- The project uses a single MongoDB deployment for simplicity while designing data models suitable for horizontal scaling.
- Seat occupancy is stored as an embedded object within `Show`, enabling fast conflict checks and efficient reservation updates.
- Payment state is decoupled via webhooks, avoiding synchronous reliance on Stripe during seat locking and release.

## Production-Oriented Design

- Designed to support future worker separation for booking ingestion, email delivery, and payment reconciliation.
- Database schema and API contracts are explicit to allow future migration into microservices.
- The current codebase is positioned for containerization, with environment variables and a clear separation between frontend and backend.
