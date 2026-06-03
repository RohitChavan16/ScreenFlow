# API Reference

This document describes the core API surface for ScreenFlow.

## Auth

### `POST /api/auth/register`
Register a new user and issue a JWT cookie.

Request body:
- `name` (string)
- `email` (string)
- `password` (string)

### `POST /api/auth/login`
Authenticate existing users and issue a session cookie.

Request body:
- `email` (string)
- `password` (string)

### `POST /api/auth/logout`
Clears the authentication cookie.

### `GET /api/auth/is-auth`
Validates the current session token.

### `POST /api/auth/send-verify-otp`
Sends an account verification OTP to the authenticated user.

### `POST /api/auth/verify-account`
Validates OTP and marks email as verified.

### `POST /api/auth/send-reset-otp`
Sends password reset OTP to the given email.

### `POST /api/auth/reset-password`
Resets password using OTP.

## User Endpoints

### `GET /api/user/data`
Returns authenticated user profile state.

### `GET /api/user/booking`
Fetches bookings for the logged-in user.

### `GET /api/user/favorites`
Loads saved favorite movies.

### `POST /api/user/update-favorite`
Toggles a movie in the user's favorites.

## Show Endpoints

### `GET /api/show/now-playing`
Fetches live now-playing movie metadata from TMDB.

### `GET /api/show/all`
Returns all available upcoming shows, populated with movie metadata.

### `GET /api/show/:movieId`
Returns a single movie detail and its future show schedule.

### `POST /api/show/add`
Creates one or more showtimes for a movie.
Requires admin authorization.

## Booking Endpoints

### `POST /api/booking/create`
Reserves selected seats and creates a Stripe checkout session.
Requires authenticated user.

Request body:
- `showId` (string)
- `selectedSeats` (array)

### `GET /api/booking/recommend-seat/:showId`
Returns a best-seat suggestion based on occupancy scoring.

### `GET /api/booking/seats/:showId`
Returns currently occupied seats for a show.

## Admin Endpoints

### `GET /api/admin/is-admin`
Validates admin access and returns admin status.

### `GET /api/admin/dashboard`
Returns booking, revenue, user, and show analytics.

### `GET /api/admin/all-shows`
Returns upcoming shows with movie metadata.

### `GET /api/admin/all-bookings`
Returns all bookings with user and show relationships.

### `GET /api/admin/check-in/:bookingId?token=...`
Validates a QR check-in token and marks a booking as checked in.

## Stripe Webhooks

### `POST /api/stripe`
Receives Stripe webhook events.
- Handles `payment_intent.succeeded`
- Finalizes bookings
- Issues QR tokens
- Sends confirmation email notifications

## Authentication Notes

- Protected endpoints use JWT stored in `token` cookie.
- `adminAuth` resolves user identity and enforces admin-level operations.
- `userAuth` validates session state and exposes `req.user` for controllers.
