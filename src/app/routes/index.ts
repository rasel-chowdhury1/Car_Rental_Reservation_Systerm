import express  from "express";
import { AuthRouter } from "../modules/Auth/Auth.router";
import { CarRouter } from "../modules/Car/Car.router";
import { BookingRouter } from "../modules/Booking/Booking.router";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/cars", CarRouter);
router.use("/bookings", BookingRouter);

export default router