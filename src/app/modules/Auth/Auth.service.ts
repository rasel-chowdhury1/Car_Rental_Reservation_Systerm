import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { UserModel } from "../User/User.model"
import { TLoginUser } from "./Auth.interface"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
    // console.log({payload})
    //checking if the user is exists
    const isUserExists = await UserModel.findOne({email: payload?.email}).select("+password")
    
    // console.log({isUserExists})
    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND,
            "This user is not found!"
        )
    }


    //checking if the password is correct
    const isPasswordMatch = await bcrypt.compare(payload?.password, isUserExists.password);

    // console.log({isPasswordMatch})

    //Access Granted: Send AccessToken, RefreshToke
    const userId = isUserExists._id.toString();
    //  console.log("user id -> ", userId)
    const jwtPayload = {
        userId: userId,
        email: isUserExists.email,
        role: isUserExists.role
    }
    //create token and send to the client
    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        {expiresIn: '30d'}
    )

   
    return {
        isUserExists,
        accessToken, 
    }
    
}

export const AuthServices = {
    loginUser,
}