import express from "express";
import { AuthValidations } from "./Auth.validation";
import validateRequest from "../../middelwares/validRequest";
import { UserControllers } from "../User/User.controller";
import { AuthController } from "./Auth.controller";
import UserValidationSchema from "../User/User.validation";

const router = express.Router();

router.post('/signin',
    validateRequest(AuthValidations.loginValidationSchema),
    AuthController.loginUser
)

router.post('/signup',
    validateRequest(UserValidationSchema),
    UserControllers.createUser
)

export const AuthRouter = router;