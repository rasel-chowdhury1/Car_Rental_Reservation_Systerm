import { Request, Response } from "express";
import { UserServices } from "./User.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";


const createUser = catchAsync(async (req: Request, res: Response) => {

    const result = await UserServices.createUserIntoDB(req.body);

    const {password, ...remainData} = result._doc

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: remainData
    })

    
})



export const UserControllers = {
    createUser
}