import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import httpStatus from "http-status"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import { TUserRole } from "../modules/Auth/Auth.interface"
import { UserModel } from "../modules/User/User.model"


const auth = (...requiredRules: TUserRole[]) => {
    
    return catchAsync( async (req: Request,res: Response, next: NextFunction) => {

        // console.log(req.headers.authorization)
        const token = req.headers.authorization?.split(" ")[1] as string;
        
        //check if the token is sent from the client
        if(!token){
            res.status(401).json({
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: "You have no access to this route",
              })
        }

        //check if the token is valid
        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string
        ) as JwtPayload;

        //decoded
        // console.log({decoded});

        // const role = decoded.role;
        // const id = decoded.userId;

        const {email, role  } = decoded;

        //checking if the user is exists
    const isUserExists = await UserModel.findOne({email: email})
    
    // console.log({isUserExists})
    if(!isUserExists){
        res.status(401).json({
            success: false,
            statusCode: httpStatus.UNAUTHORIZED,
            message: "This user is not exists!!!",
          })

    }



        if(requiredRules && !requiredRules.includes(role)){
          res.status(401).json({
            success: false,
            statusCode: httpStatus.UNAUTHORIZED,
            message: "You have no access to this route",
          })
        }
        req.user = decoded;


        next()
    })
}

export default auth