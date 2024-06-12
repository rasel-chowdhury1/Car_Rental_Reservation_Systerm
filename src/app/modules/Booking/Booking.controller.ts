import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./Booking.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";


const createBooking = catchAsync( async (req: Request, res: Response) => {
    //  console.log('req user -> ', req)
    // console.log("req user -> ", req.body)

    // console.log({body})
    const result = await BookingServices.createBookingIntoDB(req.user, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car booked successfully",
        data: result
    })
})

const getAllBooking = catchAsync( async (req: Request, res: Response) => {

    const result = await BookingServices.getAllBookingFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result
    })
})

const updateEndBookingByAdmin = catchAsync( async (req: Request, res: Response) => {
     
    const result = await BookingServices.updateEndBookingByAdminIntoDB(req.body);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car booked successfully",
        data: result
    })
})

export const BookingControllers = {
    createBooking,
    getAllBooking,
    updateEndBookingByAdmin
}