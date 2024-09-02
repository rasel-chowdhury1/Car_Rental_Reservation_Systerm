import { Request, Response } from "express";
import { UserServices } from "./User.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createUser = catchAsync(async (req: Request, res: Response) => {

    const result = await UserServices.createUserIntoDB(req.body);


    //@ts-ignore
    const {password, ...remainData} = result._doc;
    

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: remainData
    })

    
})

const getAllUsers = catchAsync( async (req, res) => {

    const result = await UserServices.getAllUserFromDB();
    
    if(result.length > 0){
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User retrieved successfully",
            data: result
        })
    }
    else{
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "No Data Found",
            data: result
        })
    }
})

const updateUser = catchAsync( async (req: Request, res: Response) => {
    const {id} = req.params;

    const result = await UserServices.updateUserIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User update successfully",
        data: result
    })
})

export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}