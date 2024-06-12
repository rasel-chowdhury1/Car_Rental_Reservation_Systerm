import { Request, Response } from "express";import { BookingModel } from "./Booking.model";
import { TBooking } from "./Booking.interface";
import { CarModel } from "../Car/Car.model";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../User/User.model";
import AppError from "../../errors/AppError";


const createBookingIntoDB = async(user: JwtPayload,payLoad) => {
    console.log({user, payLoad})

    const isUserExists = await UserModel.findById(user.userId);

    if(!isUserExists){
        throw new AppError(
            httpStatus.NOT_FOUND,
            "User is not exists!!!"
        )
    }

    if(user.role != 'user'){
        throw new AppError(httpStatus.NOT_ACCEPTABLE,
            "Booking can not possible coz role will be user"
        )
    }
    
    const isCarExist = await CarModel.findById(payLoad?.carId)

    if(!isCarExist){
        throw new AppError(httpStatus.NOT_FOUND, 
            "This car not exist"
        )
    }

    if(isCarExist.isDeleted){
        throw new AppError(httpStatus.NOT_FOUND, 
            "This car is deleted"
        )
    }
    
    const newBooking = {
        user: user.userId,
        car: payLoad.carId,
        date: payLoad.date,
        startTime: payLoad.startTime
    }
    
    const result =  await (await (await BookingModel.create(newBooking)).populate('user')).populate('car');
    return result;
}


const getAllBookingFromDB = async () => {
    const result = await BookingModel.find()
    return result
}

const updateEndBookingByAdminIntoDB = async(payload) => {

    const { bookingId, endTime } = payload;

    const isBookingExists = await BookingModel.findById(bookingId);

    if(!isBookingExists){
        throw new AppError(httpStatus.NOT_FOUND,
            "Booking id not found"
        )
    }


    // Create Date objects for the current date and the provided times
    const currentDate = new Date();
    const [startHour, startMinute] = isBookingExists?.startTime?.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startHour, startMinute);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endHour, endMinute);


     // Calculate the difference in milliseconds
     let diffMs = endDate - startDate;

    if(diffMs < 0){
        throw new AppError(httpStatus.NOT_ACCEPTABLE,
            "Your end time is small from startTime.so not accept this."
        )
    }

    const diffHours = diffMs / (1000 * 60 * 60);

    const getSpecificBookingCar = await CarModel.findById(isBookingExists.car);


    const BookingPricePerHour = getSpecificBookingCar?.pricePerHour as number;

    const totalCost = BookingPricePerHour * diffHours;
    
    const result = await BookingModel.findByIdAndUpdate(
        bookingId, 
        {
            endTime,
            totalCost
        },
        {new: true}
    )

    return result

    
}

export const BookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
    updateEndBookingByAdminIntoDB
}