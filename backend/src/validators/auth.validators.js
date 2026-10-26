import { z } from "zod";

const emailSchema = z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email address is too long.")
    .transform((email) => email.toLowerCase());

const passwordSchema = z
    .string()
    .min(10, "Password must contain at least 10 characters.")
    .refine(
        (password) => Buffer.byteLength(password, "utf8") <= 72,
        "Password must not exceed 72 UTF-8 bytes."
    );

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must contain at least 2 characters.")
        .max(80, "Name must not exceed 80 characters."),
    email: emailSchema,
    password: passwordSchema,
});

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required."),
});