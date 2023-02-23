import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import colors from "colors";
const clr = colors;
import authRoute from "./routes/authRoute.js";
import roomsRoute from "./routes/roomsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import hotelsRoute from "./routes/hotelRoute.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/Error.js";
import cookieParser from "cookie-parser";

const app: Application = express();
const PORT = process.env.PORT || 5050;
connectDB();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(errorHandler);
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
