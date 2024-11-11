import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    name: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords should match",
    path: ["confirmPassword"],
  });
