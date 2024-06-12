import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError"
import httpStatus from "http-status"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import { TUserRole } from "../modules/Auth/Auth.interface"
import { UserModel } from "../modules/User/User.model"


const auth = (...requiredRules: TUserRole[]) => {
    
    return catchAsync( async (req: Request,res: Response, next: NextFunction) => {

        console.log(req.headers.authorization)
        const token = req.headers.authorization;
        
        //check if the token is sent from the client
        if(!token){
           throw new AppError(httpStatus.UNAUTHORIZED,
            "You are not Authorized!!!"
           )
        }

        //check if the token is valid
        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string
        ) as JwtPayload;

        //decoded
        console.log({decoded});

        // const role = decoded.role;
        // const id = decoded.userId;

        const {email, role, iat } = decoded;

        //checking if the user is exists
    const isUserExists = await UserModel.findOne({email: email})
    
    console.log({isUserExists})
    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND,
            "This user is not found!"
        )
    }



        if(requiredRules && !requiredRules.includes(role)){
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized hi!!!"
          )
        }
        req.user = decoded;


        next()
    })
}

export default auth