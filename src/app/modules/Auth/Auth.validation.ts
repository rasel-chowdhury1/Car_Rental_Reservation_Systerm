import Joi from "joi";


const loginValidationSchema = Joi.object({
    email: Joi.string()
           .required()
           .messages({'any.required': 'Email is required'}),
    password: Joi.string()
           .required()
           .messages({'any.required': 'Password is required'})
})

export const AuthValidations = {
    loginValidationSchema
}