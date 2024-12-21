import { z } from "zod";


export const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "name is required"),
    email: z.string().email({ message: "Invalid email address" }),
    pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
  }),
});

export const loginUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "name is required"),
    email: z.string().email({ message: "Invalid email address" }),
    pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
  }),
});

