import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import authRoutes  from "./routes/auth.routes.js";
import roomsRoutes from "./routes/rooms.routes.js";
import cors from "cors"
import dotenv from "dotenv";

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api', authRoutes)
app.use('/api', roomsRoutes)
dotenv.config();

export default app
