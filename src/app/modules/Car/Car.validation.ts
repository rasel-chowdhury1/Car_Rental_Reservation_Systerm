import Joi from "joi";


const CreateCarValidationSchema = Joi.object({
    name: Joi.string()
             .trim()
             .required()
             .messages({
                'string.base': '"Name" should be a type of string',
                'string.empty': '"Name" cannot be an empty field',
                'any.required': '"Name" is required',
                }),
    photo: Joi.string()
            .required()
            .messages({
            'string.base': '"Name" should be a type of string',
            'string.empty': '"Name" cannot be an empty field',
            'any.required': '"Name" is required',
            }),
    description: Joi.string()
                    .required()
                    .messages({
                        'string.base': '"Description" should be a type of string',
                        'string.empty': '"Description" cannot be an empty field',
                        'any.required': '"Description" is required',
                    }),
    color: Joi.string()
              .required()
              .messages({
                'string.base': '"Color" should be a type of string',
                'string.empty': '"Color" cannot be an empty field',
                'any.required': '"Color" is required',
            }),
    isElectric: Joi.boolean()
                   .required(),
    status: Joi.string().optional(),
    features: Joi.array()
                 .items(Joi.string()),
    pricePerHour: Joi.number()
                     .required(),
    isDeleted: Joi.boolean().optional()
                
})


const UpdateCarValidationSchema = Joi.object({
    name: Joi.string()
             .trim()
             .optional(),
    description: Joi.string()
                    .optional(),
    color: Joi.string()
              .optional(),
    isElectric: Joi.boolean()
                   .optional(),
    status: Joi.string().optional(),
    features: Joi.array()
                 .items(Joi.string()).optional(),
    pricePerHour: Joi.number()
                     .optional(),
    isDeleted: Joi.boolean().optional()
                
})

export const CarValidations = {
    CreateCarValidationSchema,
    UpdateCarValidationSchema
}
