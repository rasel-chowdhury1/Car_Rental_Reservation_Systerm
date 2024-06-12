import { TUser } from "./User.interface";
import { UserModel } from "./User.model";


const createUserIntoDB = async ( userData: TUser) => {
    const result = await UserModel.create(userData)

    return result;
}

export const UserServices = {
    createUserIntoDB
}