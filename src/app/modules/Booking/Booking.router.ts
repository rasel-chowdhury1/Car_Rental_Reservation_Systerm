import express  from "express";
import { BookingControllers } from "./Booking.controller";
import auth from "../../middelwares/auth";

const router = express.Router();

router.post("/", 
    auth('user'),
    BookingControllers.createBooking
);

router.get("/",
    auth("admin"),
    BookingControllers.getAllBooking
)

router.get("/my-bookings", 
    auth("user"),
    BookingControllers.getSpecificBooking
)


export const BookingRouter = router;