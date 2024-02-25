import { z } from 'zod';
import { isNumber } from '../../utils/helper';
import { RoleType } from './auth.interface';

const Roles: RoleType[] = ['USER', 'AGENT'];

const MobileValidationSchema = z
  .string({ required_error: 'Mobile Number is required' })
  .refine((val) => isNumber(val), {
    message: 'Please provide a valid phone number',
  });

const EmailValidationSchema = z
  .string({ required_error: 'Email is required' })
  .email({ message: 'Please provide an valid Email' });

const CreateAccountValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: EmailValidationSchema,
  mobile: MobileValidationSchema,

  role: z.enum([...(Roles as [string, ...string[]])], {
    required_error: 'Please provide a role',
  }),

  nid: z
    .string({ required_error: 'NID is required' })
    .length(10, { message: 'NID length has to be 10' })
    .refine((val) => isNumber(val), {
      message:
        'Please provide an valid NID, NID should not container any character',
    }),

  pin: z
    .string({ required_error: 'Pin is required' })
    .length(5, { message: 'Length of pin has to be 5' }),
});

export const AuthValidation = {
  CreateAccountValidationSchema,
};

export type CreateAccountValidationSchemaType = z.infer<
  typeof CreateAccountValidationSchema
>;
