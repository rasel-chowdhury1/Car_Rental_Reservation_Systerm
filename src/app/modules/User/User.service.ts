import { TUser } from "./User.interface";
import { UserModel } from "./User.model";


const createUserIntoDB = async ( userData: TUser) => {
    const result = await UserModel.create(userData)

    return result;
}

const getAllUserFromDB = async () => {
    const result = await UserModel.find();

    return result
}

const updateUserIntoDB = async (id: string, updateData: Partial<TUser>) => {
    console.log({updateData})
    const result = await UserModel.findByIdAndUpdate(id, updateData, {
        new: true
    })


    return result
}

export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    updateUserIntoDB
}