
ScreenFlow – Full-Stack Cinema Booking and Administration Solution.

ScreenFlow is a full-stack web application that allows users to browse movies, select showtimes, book seats, and make secure online payments.
It also features an admin dashboard for managing movies, showtimes, and tracking total bookings and revenue. 
The project includes role-based authentication, real-time seat selection, and Stripe integration for payments in INR and USD.


🧩 Features Overview

👥 For Users
🔍 View movies with posters, descriptions, genres, and showtimes.
🗓️ Select preferred date, time, and seats.
🎟️ Book tickets with real-time seat availability.
💳 Secure payment through Stripe with INR/paise support.
📜 Access complete booking history under “My Bookings”.

🔐 For Admin:🎬 Add/edit/delete movies with metadata (title, duration, image, etc.)
🕒 Create and manage showtimes (date, time, ticket price, seat map)
📊 Dashboard showing:
Total movies available
Total number of bookings
Total revenue generated
🧑‍💼 Admin authentication with protected routes



⚙️ Tech Stack
Layer	Tech Used
Frontend	React.js, Tailwind CSS, React Router
Backend	Node.js, Express.js
Database	MongoDB with Mongoose ODM
Authentication	JWT (JSON Web Tokens)
Payments	Stripe API (INR/paise support)
