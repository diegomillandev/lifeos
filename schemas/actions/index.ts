import z from "zod";

// register schema
export const RegisterSchemaActions = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
export const RegisterResponseApiSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  erros: z
    .object({
      email: z.array(z.string()).optional(),
      password: z.array(z.string()).optional(),
      confirmPassword: z.array(z.string()).optional(),
    })
    .optional(),
});


// login schema
export const LoginSchemaActions = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
export const LoginResponseApiSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  token: z.string(),
});