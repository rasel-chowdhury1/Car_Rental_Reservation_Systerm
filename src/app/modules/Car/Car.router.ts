import express  from "express";
import { CarController } from "./Car.controller";
import validateRequest from "../../middelwares/validRequest";
import { CarValidations } from "./Car.validation";
import { BookingControllers } from "../Booking/Booking.controller";
import auth from "../../middelwares/auth";

const router = express.Router();

router.post("/", 
    validateRequest(CarValidations.CreateCarValidationSchema),
    CarController.CreateCar);

router.get("/",
    CarController.getAllCars
)

router.get("/:id",
    CarController.getSingleCar
)

router.patch("/:id",
    CarController.updateCar
)

router.delete("/:id",
    CarController.deleteCar
)

router.put("/return",
    auth("admin"),
    BookingControllers.updateEndBookingByAdmin
)

export const CarRouter = router;