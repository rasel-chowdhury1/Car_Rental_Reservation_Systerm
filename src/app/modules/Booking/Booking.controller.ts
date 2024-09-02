import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./Booking.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createBooking = catchAsync( async (req: Request, res: Response) => {
    //  console.log('req user -> ', req)
    console.log("req user -> ", req.body)

    const result = await BookingServices.createBookingIntoDB(req.user, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car booked successfully",
        data: result
    })
})

const getAllBooking = catchAsync( async (req: Request, res: Response) => {

    const result = await BookingServices.getAllBookingFromDB(req.query)
    
    if(result.length > 0){
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Bookings retrieved successfully",
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

const getSingleBooking = catchAsync( async (req: Request, res: Response) => {
    const {id} = req.params;
    const result = await BookingServices.getSingleBookingFromDB(id)
    
    if(result){
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Bookings retrieved successfully",
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

const confirmBookingByUser = catchAsync( async (req: Request, res: Response) => {
    console.log("confirm booking body data -> ",req.body)
    // const {id} = req.params;
    const result = await BookingServices.confirmBookingByUserIntoDB(req.body);
    console.log({result})
    
    // if(result){
    //     sendResponse(res, {
    //         statusCode: httpStatus.OK,
    //         success: true,
    //         message: "Bookings deleted successfully",
    //         data: result
    //     })
    // }
    // else{
    //     sendResponse(res, {
    //         statusCode: httpStatus.NOT_FOUND,
    //         success: false,
    //         message: "No Data Found",
    //         data: result
    //     })
    // }
    
}) 

const deleteBookingByUser = catchAsync( async (req: Request, res: Response) => {
    const {id} = req.params;
    const result = await BookingServices.deletedBookingByUserIntoDB(id)
    
    if(result){
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Bookings deleted successfully",
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

const getSpecificBooking = catchAsync( async (req: Request, res: Response) => {
   console.log(req.user)
    const result = await BookingServices.getSpecificUserBookingFromDB(req.user);

    if(result.length > 0){
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "My Bookings retrieved successfully",
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

const returnBookingByUser = catchAsync( async (req: Request, res: Response) => {
     
    const result = await BookingServices.returnBookingByUserIntoDB(req.body);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car booked successfully",
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
    getSingleBooking,
    getAllBooking,
    updateEndBookingByAdmin,
    getSpecificBooking,
    returnBookingByUser,
    deleteBookingByUser,
    confirmBookingByUser
}