# Database Design

ScreenFlow uses MongoDB as the persistence layer with focused document models for users, movies, shows, and bookings.

## Collection Models

### `users`
- `name`
- `email`
- `password`
- `role`
- `favorites` — array of movie references
- `bookings` — array of booking references
- `verifyotp`, `verifyOtpExpireAt`
- `resetotp`, `resetOtpExpireAt`
- `isAccountVerified`

### `movies`
- `_id`: TMDB identifier
- `title`, `overview`, `poster_path`, `backdrop_path`
- `release_date`, `original_language`
- `genres`, `casts`
- `vote_average`, `runtime`

### `shows`
- `movie` reference
- `screen` enum
- `showDateTime`
- `showPrice`
- `occupiedSeats` object map

### `bookings`
- `user` reference
- `show` reference
- `amount`
- `bookedSeats`
- `isPaid`
- `expiresAt`
- `paymentLink`
- `checkInToken`
- `checkedIn`

## Design Rationale

- `occupiedSeats` is stored as an embedded object on `Show` for fast seat conflict resolution.
- `bookedSeats` in `Booking` preserves the exact seat set even after a show has completed.
- `checkInToken` enables secure ticket validation without exposing payment metadata.
- `Movie` documents are seeded from TMDB and referenced by show records, making the show model lightweight.

## Relationships

- `Show.movie` references `Movie`.
- `Booking.show` references `Show`.
- `Booking.user` references `User`.
- `User.favorites` references `Movie`.

## Scalability Considerations

- The current schema supports sharding by `showDateTime` or `screen` for horizontal scaling.
- `Show.occupiedSeats` can migrate to a dedicated seat reservation collection if concurrency demands increase.
- `Booking` and `Show` read/write patterns are optimized for append-heavy booking workloads and periodic cleanup.
