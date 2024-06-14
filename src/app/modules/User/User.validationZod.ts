import { z } from "zod";

const UserValidationSchemaZod = z.object({
  name: z.string()
         .max(20, { message: '"name" cannot be more than 20 characters' })
         .trim()
         .min(1,{ message: '"Name" cannot be an empty field' })
         .refine(value => typeof value === 'string', { message: '"Name" should be a type of string' }),
  email: z.string()
          .email({ message: 'Email must be a valid email' })
          .min(1,{ message: 'Email is required' }),
  role: z.enum(['user', 'admin'], { errorMap: () => ({ message: '{#label} is not a valid role' }) }),
  password: z.string()
             .max(20, { message: 'Password cannot be more than 20 characters' })
             .min(1,{ message: 'Password is required' })
             .refine(value => typeof value === 'string', { message: 'Password must be a string' }),
  phone: z.string()
          .min(1,{ message: 'Phone number is required' }),
  address: z.string()
            .min(1,{ message: 'Address is required' }),
});

export default UserValidationSchemaZod;
