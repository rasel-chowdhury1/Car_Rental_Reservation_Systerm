import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./Auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const loginUser = catchAsync( async (req: Request, res: Response) => {

    const result = await AuthServices.loginUser(req.body);
    const {isUserExists, accessToken} = result;

    const {password, ...remainData} = isUserExists

    // sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: "User logged in successfully",
    //     data: result,
    // })

    res.status(200).json({
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: isUserExists,
        token: accessToken
    })
})


export const AuthController = {
    loginUser
}