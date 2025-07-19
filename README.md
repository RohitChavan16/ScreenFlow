ScreenFlow – Full-Stack Cinema Booking and Administration Solution.

ScreenFlow is a full-stack web application that allows users to browse movies, select showtimes, book seats, and make secure online payments.
It also features an admin dashboard for managing movies, showtimes, and tracking total bookings and revenue. 
The project includes role-based authentication, real-time seat selection, and Stripe integration for payments in INR and USD.


<img width="1890" height="905" alt="Screenshot 2025-07-19 192711" src="https://github.com/user-attachments/assets/89b577b7-b058-4aff-a828-5b1be2b43561" />


🧩 Features Overview

👥 For Users 
- Sign up, login, and authentication (cookies-based)
- Browse trending movies from TMDB API
- View show timings and availability
- Select and book seats
- Stripe integration for secure payments
- Email confirmation with QR code check-in
- Realtime seat hold & release logic with cron jobs


<img width="1872" height="897" alt="Screenshot 2025-07-09 173749" src="https://github.com/user-attachments/assets/79e5d490-6e71-4c8b-be9c-86975d345ab4" />

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<img width="1882" height="905" alt="Screenshot 2025-07-15 110257" src="https://github.com/user-attachments/assets/9aa1c03c-360d-4441-8594-74fbe6c04ada" />



🔐 For Admin: 
- Add/edit/delete movies with metadata (title, duration, image, etc.)
- Create and manage showtimes (date, time, ticket price, seat map)
- Dashboard showing:
- Total movies available
- Total number of bookings
- Total revenue generated
- Admin authentication with protected routes


<img width="1892" height="898" alt="Screenshot 2025-07-11 170057" src="https://github.com/user-attachments/assets/8192e987-c29e-456a-b5bf-5514a42dbf57" />


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



<img width="1888" height="900" alt="Screenshot 2025-07-19 193831" src="https://github.com/user-attachments/assets/97467870-59ea-4031-8fc4-7a676f157b77" />




### ⚙️ Backend
- **Node.js**, **Express.js**
- **MongoDB**, **Mongoose**
- **Stripe** for payments
- **Nodemailer** for email delivery
- **Cron Jobs** for auto seat expiry
- **JWT**, **Cookie-based Auth**
- QR code token system for check-in
- Deployed on **Render**

### 💻 Frontend
- **React.js**, **Tailwind CSS**
- **React Router**
- **Axios**, **React Toastify**
- **html5-qrcode** for QR scanning
- Deployed on **Vercel**


<img width="1892" height="908" alt="Screenshot 2025-07-11 204933" src="https://github.com/user-attachments/assets/487e73db-e569-4603-bfde-dc2300f3bbae" />


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


<img width="1891" height="901" alt="Screenshot 2025-07-11 204610" src="https://github.com/user-attachments/assets/22947404-9a08-4601-a18c-c81ae4a51262" />



## 🔐 QR Check-In Flow

1. On successful booking, an email is sent with a **QR Code**.
2. QR links to:  
   `https://<server>/api/admin/check-in/:bookingId?token=checkInToken`
3. Admin scanner uses `html5-qrcode` to scan.
4. Server verifies token & updates booking.
5. User is marked as **checked in** in DB.

<img width="1911" height="905" alt="Screenshot 2025-07-15 200558" src="https://github.com/user-attachments/assets/da434217-dac9-4ed6-b89b-732c1bda84c5" />


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


<img width="1830" height="900" alt="Screenshot 2025-07-15 114639" src="https://github.com/user-attachments/assets/43d20cbf-4a0c-4c4c-b3f8-313452155375" />


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



<img width="1896" height="897" alt="Screenshot 2025-07-19 193911" src="https://github.com/user-attachments/assets/fa67da2f-7c2d-45fb-ae73-554fa1bcec83" />


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



<img width="1899" height="901" alt="Screenshot 2025-07-19 202254" src="https://github.com/user-attachments/assets/68ac14d0-c44e-4296-9283-00fff52e3779" />



More features are to be include and this project is not completed yet.
