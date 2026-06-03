# Deployment

ScreenFlow is engineered for a clean separation between local development and production-inspired deployment topology.

## Local Setup

### Backend
1. Navigate to `server/`
2. Install dependencies: `npm install`
3. Create `.env` with:
   - `PORT`
   - `MONGODB_URL`
   - `JWT_SECRET`
   - `NODE_ENV`
   - `CLIENT_URL`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SENDER_EMAIL`
   - `TMDB_API_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Start the server: `npm run server`

### Frontend
1. Navigate to `client/`
2. Install dependencies: `npm install`
3. Create `.env` with:
   - `VITE_BACKEND_URL`
   - `VITE_CURRENCY`
   - `VITE_TMDB_IMAGE_BASE_URL`
4. Start the app: `npm run dev`

## Production-Inspired Topology

ScreenFlow is designed for a split-hosting architecture:

- **Frontend**: Static React bundle served by a modern CDN or hosting platform.
- **Backend**: Node.js Express API running behind a secure host.
- **Database**: MongoDB Atlas or managed cluster.
- **Payment Gateway**: Stripe checkout with webhook-driven finalization.
- **Email Delivery**: SMTP relay for ticket and booking notifications.

This architecture supports a clean boundary between user interaction and backend orchestration.

## Containerization Path

The repository structure enables containerization with the following path:

- `client` as a build artifact
- `server` as a Node.js container
- environment variables injected through runtime configuration
- reverse proxy or API gateway to handle routing and TLS termination

## Future Deployment Evolution

The current development footprint is positioned for:

- Kubernetes / Docker Compose orchestration
- multi-zone database deployments
- managed secret injections and environment pipelines
- CDN-based frontend delivery with API origin routing
