import { Request, Response } from "express";
import { paymentServices } from "./payment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const confirmationController = async (req: Request, res: Response) => {
    const { transactionId, status } = req.query;
     console.log("req query=> ",req.query)

    try {
        const result = await paymentServices.confirmationService(transactionId as string, status as string);
        res.send(result)
    } catch (error) {
        console.log({error})
    }
    
};

const paymentHistoryByUser = async (req: Request, res: Response) => {
    const {userId} = req.params;

    const result = await paymentServices.paymentHistoryByUserFromDB(userId);
    console.log('payment history by user', result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specific user payment history retrive successfull...",
        data: result
    })
  
}

export const paymentControler = {
    confirmationController,
    paymentHistoryByUser
}