import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";
import connectDB from "./config/mongodb.js";

import './cron/bookingCleanup.js';


const app = express();
const port = process.env.PORT || 4000
connectDB();

app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

app.use(cors({origin: process.env.CLIENT_URL ,credentials: true,})); 
app.use(cookieParser());
app.use(express.json());


app.get('/', (req, res) => {res.send("Api Is Working best")});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin', adminRouter);


app.listen(port, () => console.log(`Server started on PORT: ${port} `));