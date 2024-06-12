import { Request, Response } from "express";
import { UserServices } from "./User.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createUser = catchAsync(async (req: Request, res: Response) => {

    const result = (await UserServices.createUserIntoDB(req.body));

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: result
    })

    
})



export const UserControllers = {
    createUser
}