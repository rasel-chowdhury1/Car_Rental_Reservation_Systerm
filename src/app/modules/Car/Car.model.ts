import { Schema, model } from "mongoose";
import { TCar } from "./Car.interface";

const CarSchema = new Schema<TCar>({
    name: {
        type: String,
        required: true
    },
    model: {
      type: String,
      required: true
    },
    photo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    isElectric: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        default: "available"
    },
    features: [
        {
            type: String,
            required: true
        }
    ],
    pricePerHour: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

export const CarModel = model<TCar>("Car", CarSchema)