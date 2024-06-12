import { Schema, model } from "mongoose";
import { TBooking } from "./Booking.interface";
import { string } from "joi";


const BookingValidationSchema = new Schema<TBooking>({

    date: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: "Car"
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String,
        default: null
    },
    totalCost: {
        type: Number,
        default: 0
    },
    isBooked: {
        type: String,
        default: "confirmed" 
    }
},
{
    timestamps: true
}
)


export const BookingModel = model<TBooking>("Booking", BookingValidationSchema);

