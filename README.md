ScreenFlow – Full-Stack Cinema Booking and Administration Solution.

ScreenFlow is a full-stack web application that allows users to browse movies, select showtimes, book seats, and make secure online payments.
It also features an admin dashboard for managing movies, showtimes, and tracking total bookings and revenue. 
The project includes role-based authentication, real-time seat selection, and Stripe integration for payments in INR.
</br>
</br>
<p align="center">
  🌴🎄🌳🌲 ⭐💖 - LinkedIn Post - 💖⭐ 🌲🌳🎄🌴
</p>

After weeks of building, debugging, and learning, I'm excited to share ScreenFlow, a complete Cinema Booking and Administration Solution.

## 💡 Why ScreenFlow?</br>
 Many local theaters still rely on outdated tools to manage shows and bookings — with no real dashboard or insight into audience trends.


## 🛠️What does ScreenFlow offer? </br>
✅ Smooth seat booking for users with Stripe payments.</br>
✅ Admin dashboard for theaters to add/manage shows & movies.</br>
✅ QR Code check-in system at the entry gate.</br>
✅ Real-time insights into bookings and user data.</br>
✅ Added a seat recommendation system to help users pick the best seats quickly!</br>
✅ Role-based login for users and admins (to make it easier to explore, the admin panel is visible even to regular users — but only real admins can make changes).</br>
✅ **Email Notifications** – Booking confirmation with embedded QR code.</br>
✅ **Auto Cleanup** – Cron jobs automatically remove expired bookings.</br>

## 🛠Tech Stack & Tools Used
Frontend: React.js, Tailwind CSS, Axios, React Toastify, QRCode.react.</br></br>
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, nodemailer</br></br>
Authentication: JWT + Cookies with role-based access (user, admin)</br></br>
Payments: Stripe API for secure booking transactions</br></br>
Movie Data: TMDB API to fetch latest movie info (posters, titles, etc.)</br></br>
QR Functionality: html5-qrcode (scanner), qrcode.react (generator)</br></br>
Hosting: Vercel (Frontend), Render (Backend)</br></br>
Nodemailer+Brevo: Email sending (confirmation, QR code delivery)</br></br>
Cron Job: Auto-removes expired bookings to free up seats.</br></br>

<p align="center">
  <a href="https://screenflow-puce.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit-blue?style=for-the-badge&logo=vercel" alt="Live Demo"/>
  </a>
  <a href="https://github.com/yourusername/screenflow" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github" alt="GitHub Repo"/>
  </a>
</p>

### What I Learned & Applied
- 🔹 **System Design Thinking** — separated user/admin modules, implemented stateless APIs, and planned for scalability.
- 🔹 **Integration Flow** – Connected TMDB data → booking → Stripe payments → QR check-in → cron-based cleanup.
- 🔹 **Backend Architecture** — designed REST APIs, database schemas, and cron jobs for real-time automation.
- 🔹 **Algorithmic Logic** – Built seat recommendation and seat hold/release systems with efficiency and accuracy.
- 🔹 **Security Practices** — implemented JWT authentication, cookie sessions, and protected admin routes.
- 🔹 **Edge Case Handling** – Covered expired bookings, failed payments, invalid tokens, and session reloads.
- 🔹 **DevOps Mindset** — handled production hosting, environment variables, and build optimization for deployment.
- 🔹 **User Experience Focus** — implemented real-time seat status, email notifications, and seat recommendations.

This project helped me gain confidence in handling all aspects of full-stack development — from frontend design to backend logic, from API security to deployment.

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




### ⚙️ **Backend Architecture**

| Layer | Technologies | Purpose |
|-------|---------------|----------|
| **Server** | Node.js, Express.js | RESTful API, business logic |
| **Database** | MongoDB, Mongoose | Data persistence & schema modeling |
| **Authentication** | JWT, Cookies | Secure role-based access |
| **Payments** | Stripe API | Handles secure booking transactions |
| **External API** | TMDB API | Fetches live movie data (titles, posters, genres) |
| **Email Service** | Nodemailer + Brevo | Sends booking confirmations & QR codes |
| **Automation** | Cron Jobs | Auto-removes expired bookings |
| **Deployment** | Render (Backend) | Production-ready hosting |


### 💻 Frontend
| Category | Technology |
|-----------|-------------|
| **Framework** | React.js (Vite / CRA) |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **State Management** | React Context / Redux Toolkit (if used) |
| **API Integration** | Axios |
| **Authentication** | JWT-based (via backend API) |
| **Payment Gateway** | Stripe (Frontend Integration) |
| **External API** | TMDB (for movie metadata, posters, etc) |
| **Build & Deployment** | Vite build → Render |


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


----------------------------------------------Booking Confirmation with Ticket is send on your Email--------------------------------------------------


<img width="1906" height="897" alt="Screenshot 2025-07-23 080711" src="https://github.com/user-attachments/assets/86a07098-d800-49fb-9e5a-1cff1b65bcee" />

## 🚀 Deployment

**Frontend:** Vercel  </br>
**Backend:** Render  </br>
**Database:** MongoDB Atlas </br> 
**Email Service:** Brevo (SMTP)  </br>
**Payments:** Stripe</br>
</br>

## 🤝 Contributing</br>
1. Fork the repo</br>
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)</br>
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)</br>
4. Push to branch (`git push origin feature/AmazingFeature`)</br>
5. Open a Pull Request
</br>

## ⚙️ Installation & Setup

Follow these steps to set up the project locally 👇

1️⃣ Clone the Repository</br>
git clone https://github.com/RohitChavan16/ScreenFlow.git</br>
cd ScreenFlow</br>
</br>
2️⃣ Backend Setup</br>
cd server</br>
npm install</br>

</br>
Create a .env file in the server folder and add the following:</br>
PORT=</br>
MONGODB_URL=</br>
JWT_SECRET=</br>
NODE_ENV=</br>
CLIENT_URL=</br>
SMTP_USER=</br>
SMTP_PASS=</br>
SENDER_EMAIL=</br>
TMDB_API_KEY=</br>
STRIPE_PUBLISHABLE_KEY=</br>
STRIPE_SECRET_KEY=</br>
STRIPE_WEBHOOK_SECRET=</br>
CLOUDINARY_CLOUD_NAME=</br>
CLOUDINARY_API_KEY=</br>
CLOUDINARY_API_SECRET=</br>
</br>

Then start the server:
</br>
npm run dev
</br>
</br>
</br>
3️⃣ Frontend Setup</br>
cd client</br>
npm install</br>
</br>

Create a .env file in the client folder:
</br>
VITE_BACKEND_URL=</br> 
VITE_CURRENCY='₹'</br>
VITE_TMDB_IMAGE_BASE_URL=</br> 

</br>
Then run:
</br>
npm run dev
</br>
4️⃣ Open the app </br>

Frontend: http://localhost:5173
</br>
Backend: http://localhost:5000 (or your PORT)
</br>

## MIT License
</br>
Copyright (c) 2025 Rohit Chavan</br>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
</br>
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
</br>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</br>

## Author
ROHIT CHAVAN </br>
@RohitChavan16
