import express  from "express";
import { BookingControllers } from "./Booking.controller";
import auth from "../../middelwares/auth";
import { USER_ROLE } from "../User/User.constrant";

const router = express.Router();

router.post("/", 
    auth('user'),
    BookingControllers.createBooking);

router.get("/",
    auth("admin"),
    BookingControllers.getAllBooking
)


export const BookingRouter = router;