import { z } from "zod";

/**
 * Validation schema for user registration
 * Validates name, email format, and password strength
 */
const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),
  surname: z.string()
    .trim()
    .min(2, "Surname must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please provide a valid email")
    .toLowerCase(),
  phone: z.string().e164(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

/**
 * Validation schema for user login
 * Validates email format and ensures password is provided
 */
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please provide a valid email")
    .toLowerCase(),
  password: z.string().min(6, "Password is required"),
});

export { registerSchema, loginSchema };