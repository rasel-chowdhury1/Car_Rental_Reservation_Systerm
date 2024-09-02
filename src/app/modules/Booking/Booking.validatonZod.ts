import { z } from "zod";

const createBookingValidationSchema = z.object({
  date: z.date().refine((date) => date !== null, { message: 'Date is required.' }),
  user: z.string().optional(),
  car: z.string().optional(),
  startTime: z.string()
              .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'The time format must be in HH:MM (24-hour) format' })
              .optional(),
  endTime: z.string()
            .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'The time format must be in HH:MM (24-hour) format' })
            .optional(),
  totalCost: z.number().default(0),
  isBooked: z.enum(["Pending", "Confirmed", "Ended"]).optional(),
  isDeletd: z.boolean().optional(),
  paymentStatus: z.enum(['Pending', 'Paid', 'Failed']).optional(),
  transactionId: z.string().optional()
});

export const BookingValidationsZod = {
  createBookingValidationSchema,
};
