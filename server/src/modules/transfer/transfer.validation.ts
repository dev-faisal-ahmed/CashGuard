import { z } from 'zod';

const AddTransferValidationSchema = z.object({
  sender: z.string({ required_error: 'Sender is required' }),
  receiver: z.string({ required_error: 'Receiver is required' }),
  amount: z
    .number({ required_error: 'Amount is required' })
    .min(50, { message: 'Minimum Amount is 50 Taka' }),
});

export const TransferValidation = { AddTransferValidationSchema };

export type AddTransferValidationSchemaType = z.infer<
  typeof AddTransferValidationSchema
>;
