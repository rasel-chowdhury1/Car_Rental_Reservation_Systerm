import { Schema, model } from "mongoose";
import { TBooking } from "./Booking.interface";
import { boolean } from "joi";


const BookingValidationSchema = new Schema<TBooking>({

    date: {
        type: String,
        default: null
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
        type: String,
        default: null
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
        enum: ['Pending', 'Confirmed', 'Ended'],
        default: 'Pending'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    transactionId: {
        type: String,
        default: null
    },
},
{
    timestamps: true
}
)


export const BookingModel = model<TBooking>("Booking", BookingValidationSchema);

