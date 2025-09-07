import z from "zod";

// register schema
export const RegisterSchemaActions = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
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

// change password schema
export const ChangePasswordSchemaActions = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords don't match",
    path: ["confirmNewPassword"],
  });

export const ChangePasswordResponseApiSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  erros: z
    .object({
      currentPassword: z.array(z.string()).optional(),
      newPassword: z.array(z.string()).optional(),
      confirmNewPassword: z.array(z.string()).optional(),
    })
    .optional(),
});

// profile update schema
export const ProfileSchemaActions = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
});

export const ProfileResponseApiSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  erros: z
    .object({
      name: z.array(z.string()).optional(),
      email: z.array(z.string()).optional(),
    })
    .optional(),
});
