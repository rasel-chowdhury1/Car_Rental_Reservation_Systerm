import { join } from "path";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";
import { BookingModel } from "../Booking/Booking.model";
import { CarModel } from "../Car/Car.model";

const confirmationService = async (transactionId: string, status: string) => {
    console.log({transactionId})
    const verifyResponse = await verifyPayment(transactionId);
    console.log({verifyResponse});

    let result;
    let message = "";

    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        result = await BookingModel.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'Paid',
            isBooked: "Ended"
        },{new: true});
        console.log({result})
        message = "Successfully Paid!"
    }
    else {
        message = "Payment Failed!"
    }

    const filePath = join(__dirname, '../../../views/confirmation.html');
    let template = readFileSync(filePath, 'utf-8')

    template = template.replace('{{message}}', message)

    return template;
}

const paymentHistoryByUserFromDB = async (userId: any) => {
        const result = await BookingModel.find(
            {
                user: userId,
                paymentStatus: "Paid"
            }
        ).populate({
            path: 'car',
            model: CarModel, 
          });
        console.log("payment user > ", result)
        return result;
}

export const paymentServices = {
    confirmationService,
    paymentHistoryByUserFromDB
}