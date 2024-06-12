import { Request, Response } from "express";
import { TCar } from "./Car.interface";
import { CarModel } from "./Car.model";


const CreateCarIntoDB = async (payLoad: TCar) => {
    
    const result = await CarModel.create(payLoad);
    return result
}

const getAllCarsFromDB = async () => {
    const result = await CarModel.find();

    return result;
}

const getSingleCarFromDB = async (id: string) => {
    const result  = await CarModel.findById(id);
    return result
}

const updateCarIntoDB = async (id: string, updateData: Partial<TCar>) => {
    const result = await CarModel.findByIdAndUpdate(id, updateData, {
        new: true
    })

    return result
}

const deleteCartIntoDB = async (id: string) => {
    const result = await CarModel.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
    return result
}

export const CarServices = {
    CreateCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarIntoDB,
    deleteCartIntoDB
}