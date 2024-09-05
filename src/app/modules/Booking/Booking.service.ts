import { BookingModel } from "./Booking.model";
import { CarModel } from "../Car/Car.model";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../User/User.model";
import AppError from "../../errors/AppError";
import { initiatePayment } from "../payment/payment.utils";

type TBook = {
    carId: string,
   isBooked:string,
}

type TUpdateEndBooking = {
    bookingId: string,

    endTime?: string
}

const createBookingIntoDB = async(user: JwtPayload,payLoad: TBook) => {
    // console.log({user, payLoad})

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
 
    console.log({isCarExist});
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
        isBooked: payLoad.isBooked,
    }

    console.log({newBooking})
    
    const result =  await (await (await BookingModel.create(newBooking)).populate('user')).populate('car');
    console.log("after booking -> ",{result})
    
    return result
    
}


const getAllBookingFromDB = async (query: Record<string,unknown>) => {

    const {carId, date } = query;
    let result;
    if(carId || date) {
        result = await BookingModel.find({
            $or: [
                {carId: carId},
                {date: date}
            ]
        })
    }
    else{
        result = await BookingModel.find()
    }

    
    return result;
}

const getSingleBookingFromDB = async (id:string) => {

    const result = await BookingModel.findById(id).populate({
        path: 'car',
        model: CarModel, 
      })
      .exec();;
    return result;
}

const getSpecificUserBookingFromDB = async (user: JwtPayload) => {

    const result = await BookingModel.find({user: user?.userId}).populate({
        path: 'car',
        model: CarModel, 
      })
      .exec();
    return result;
}

const confirmBookingByUserIntoDB = async(payload: any) => {
    console.log({payload})
    const {bookingId,carId,date,startTime,isBooked} = payload;
    const res = await BookingModel.findByIdAndUpdate(
        bookingId,
        {date, startTime, isBooked},
        {new: true}
    )

    console.log({res});

    if(res){
        try {
            const result = await CarModel.findByIdAndUpdate(
                carId,
                {status: "UnAvailable"}
            )
            console.log({result})
        } catch (error) {
            console.log({error})
        }
    }
    

    return res;

}



const deletedBookingByUserIntoDB = async( bookingId: string) => {
    
    console.log("Received bookingId -> ", bookingId);
    const existingBooking = await BookingModel.findById(bookingId);
console.log("Existing booking -> ", existingBooking);
    const result = await BookingModel.findByIdAndUpdate(
        bookingId,{
            isDeleted: true
        },
        {new:true}
    )
    console.log("after delete booking -> ", result )
    return result;
}


const returnBookingByUserIntoDB = async(payload : any) => {
    const {bookingId, endTime, totalCost, user } = payload;
    const transactionId = `TXN-${Date.now()}`;
    console.log(" set booking -> ",{transactionId})
    
    const result = await BookingModel.findByIdAndUpdate(
        bookingId, 
        {
            endTime,
            totalCost,
            transactionId
        },
        {new: true}
    )


    const paymentData = {
        transactionId,
        totalCost,
        custormerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone,
        customerAddress: user.address
    }

        //payment
        const paymentSession = await initiatePayment(paymentData);

        console.log(paymentSession)
    
        return paymentSession;

}

const updateEndBookingByAdminIntoDB = async(payload: TUpdateEndBooking) => {

    const { bookingId, endTime } = payload;

    const isBookingExists = await BookingModel.findById(bookingId);

    if(!isBookingExists){
        throw new AppError(httpStatus.NOT_FOUND,
            "Booking id not found"
        )
    }


    // Create Date objects for the current date and the provided times
    const currentDate = new Date();
    const [startHour, startMinute] = isBookingExists?.startTime 
  ? isBookingExists.startTime.split(':').map(Number) 
  : [0, 0];
  const [endHour, endMinute] = endTime 
  ? endTime.split(':').map(Number) 
  : [0, 0];
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startHour, startMinute);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endHour, endMinute);


     // Calculate the difference in milliseconds
     const diffMs = endDate.getTime() - startDate.getTime();

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
    getSingleBookingFromDB,
    getAllBookingFromDB,
    updateEndBookingByAdminIntoDB,
    getSpecificUserBookingFromDB,
    returnBookingByUserIntoDB,
    deletedBookingByUserIntoDB,
    confirmBookingByUserIntoDB
}