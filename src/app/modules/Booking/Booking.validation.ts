import Joi from "joi";
import { Schema } from "mongoose";

const createBookingValidationSchema = Joi.object({
    date: Joi.date()
             .required()
             .messages({
                'date.base': 'Date must be a valid date.',
                'any.required': 'Date is required.'
             }),
    user: Joi.string()
             .optional(),
    car: Joi.string()
            .optional(),
    startTime: Joi.string()
                .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/, '24-hour time')
                .required()
                .messages({
                'string.pattern.base': 'The time format must be in HH:MM (24-hour) format',
                'any.required': 'The time is required'
                }),
    endTime: Joi.string()
                .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/, '24-hour time')
                .optional()
                .messages({
                'string.pattern.base': 'The time format must be in HH:MM (24-hour) format',
                'any.required': 'The time is required'
                }),
    totalCost: Joi.number()
                  .default(0),
    isBooked: Joi.string()
                 .valid("unconfirmed", "confirmed" )
                 .optional()
})


export const BookingValidations = {
    createBookingValidationSchema,
}