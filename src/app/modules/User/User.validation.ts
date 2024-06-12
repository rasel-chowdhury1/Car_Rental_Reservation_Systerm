import Joi from "joi";


const UserValidationSchema = Joi.object({
    name: Joi.string()
            .max(20)
            .trim()
            .required()
            .messages({
            'string.base': '"Name" should be a type of string',
            'string.empty': '"Name" cannot be an empty field',
            'string.max': '"name" can not be more than 20 characters',
            'any.required': '"Name" is required',
            }),
    email: Joi.string()
              .email()
              .required()
              .messages({
                    'string.email': 'Email must be a valid email',
                    'any.required': 'Email is required',
                }),
    role: Joi.string()
             .valid('user', 'admin')
             .required()
             .messages({
                'any.only': '{#label} is not a valid role',
              }),
    password: Joi.string()
                 .max(20)
                 .required()
                 .messages({
                        'string.base': 'Password must be a string',
                        'string.max': 'Password can not be 20 characters',
                    }),
    phone: Joi.string()
              .required()
              .messages({
        'any.required': 'Phone number is required',
      }),
    address: Joi.string()
                .required()
                .messages({
                    'any.required': 'Address is required',
                }),
})


export default UserValidationSchema;