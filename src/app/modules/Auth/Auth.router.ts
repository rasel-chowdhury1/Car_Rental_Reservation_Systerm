import express from "express";
import validateRequest from "../../middelwares/validRequest";
import { UserControllers } from "../User/User.controller";
import { AuthController } from "./Auth.controller";
import { AuthValidationZod } from "./Auth.validationZod";
import UserValidationSchemaZod from "../User/User.validationZod";


const router = express.Router();

router.post('/signin',
    validateRequest(AuthValidationZod.loginValidationSchema),
    AuthController.loginUser
)

router.post('/signup',
    validateRequest(UserValidationSchemaZod),
    UserControllers.createUser
)

export const AuthRouter = router;