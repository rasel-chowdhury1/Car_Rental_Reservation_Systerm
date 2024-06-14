import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CarServices } from "./Car.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const CreateCar = catchAsync( async (req: Request, res: Response) => {

    const result = await CarServices.CreateCarIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car created successfully",
        data: result
    })
})

const getAllCars = catchAsync( async (req, res) => {

    const result = await CarServices.getAllCarsFromDB();
    
    if(result.length > 0){
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Cars retrieved successfully",
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

const getSingleCar = catchAsync( async (req, res) => {
    const {id} = req.params;

    const result = await CarServices.getSingleCarFromDB(id);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "A Car retrieved successfully",
        data: result
    })
})

const updateCar = catchAsync( async (req: Request, res: Response) => {
    const {id} = req.params;

    const result = await CarServices.updateCarIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car updated successfully",
        data: result
    })
})

const deleteCar = catchAsync( async (req: Request, res: Response) => {
    const {id} = req.params;

    const result = await CarServices.deleteCartIntoDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car Deleted successfully",
        data: result
    })
})

export const CarController = {
    CreateCar,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar
    
}