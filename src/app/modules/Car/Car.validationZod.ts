import { z } from "zod";

const CreateCarValidationSchema = z.object({
  name: z.string()
         .trim()
         .nonempty({ message: '"Name" cannot be an empty field' })
         .refine(value => typeof value === 'string', { message: '"Name" should be a type of string' }),
  model: z.string()
         .trim()
         .nonempty({ message: '"Model" cannot be an empty field' })
         .refine(value => typeof value === 'string', { message: '"Model" should be a type of string' }),
  photo: z.string()
          .refine(value => typeof value === 'string', { message: '"Photo" should be a type of string' }),
  description: z.string()
                .nonempty({ message: '"Description" cannot be an empty field' })
                .refine(value => typeof value === 'string', { message: '"Description" should be a type of string' }),
  color: z.string()
          .nonempty({ message: '"Color" cannot be an empty field' })
          .refine(value => typeof value === 'string', { message: '"Color" should be a type of string' }),
  isElectric: z.boolean(),
  status: z.string().optional(),
  features: z.array(z.string()).optional(),
  pricePerHour: z.number(),
  isDeleted: z.boolean().optional()
});

const UpdateCarValidationSchema = z.object({
  name: z.string()
         .trim()
         .optional(),
  model: z.string()
        .optional(),
  description: z.string()
                .optional(),
  color: z.string()
          .optional(),
  isElectric: z.boolean()
               .optional(),
  status: z.string().optional(),
  features: z.array(z.string()).optional(),
  pricePerHour: z.number().optional(),
  isDeleted: z.boolean().optional()
});

export const CarValidationsZod = {
  CreateCarValidationSchema,
  UpdateCarValidationSchema
};
