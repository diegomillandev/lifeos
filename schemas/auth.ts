import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long').max(30, 'Username must be at most 30 characters long').optional(),
    email: z.email('Invalid email address'),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const LoginSchema = z.object({
    email: z.email('Invalid email address').min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
});