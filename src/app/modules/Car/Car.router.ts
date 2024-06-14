import express  from "express";
import { CarController } from "./Car.controller";
import validateRequest from "../../middelwares/validRequest";
import { BookingControllers } from "../Booking/Booking.controller";
import auth from "../../middelwares/auth";
import { CarValidationsZod } from "./Car.validationZod";

const router = express.Router();

router.post("/", 
    auth("admin"),
    validateRequest(CarValidationsZod.CreateCarValidationSchema),
    CarController.CreateCar);

router.get("/",
    CarController.getAllCars
)

router.get("/:id",
    CarController.getSingleCar
)

router.patch("/:id",
    auth("admin"),
    CarController.updateCar
)

router.delete("/:id",
    auth("admin"),
    CarController.deleteCar
)

router.put("/return",
    auth("admin"),
    BookingControllers.updateEndBookingByAdmin
)

export const CarRouter = router;