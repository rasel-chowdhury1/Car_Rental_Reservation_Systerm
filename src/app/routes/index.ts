import express  from "express";
import { AuthRouter } from "../modules/Auth/Auth.router";
import { CarRouter } from "../modules/Car/Car.router";
import { BookingRouter } from "../modules/Booking/Booking.router";
import { paymentRoutes } from "../modules/payment/payment.route";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/cars", CarRouter);
router.use("/bookings", BookingRouter);
router.use("/payment", paymentRoutes);

export default router