import { z } from 'zod';

/** ---------- Reusable field schemas ---------- */

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Enter a valid email address');

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(128, 'Password is too long');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(60, 'Name is too long')
  .regex(/^[A-Za-z\s'-]+$/, 'Name contains invalid characters');

export const phoneSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number');

export const pinCodeSchema = z
  .string()
  .regex(/^\d{6}$/, 'Enter a valid 6-digit PIN code');

/** ---------- Form schemas ---------- */

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: passwordSchema,
  remember: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    firstName: nameSchema,
    lastName:  nameSchema,
    email:     emailSchema,
    password:  passwordSchema,
    confirm:   z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path:    ['confirm'],
  });

export const addressSchema = z.object({
  fullName:  z.string().min(2, 'Full name is required'),
  phone:     phoneSchema,
  pinCode:   pinCodeSchema,
  city:      z.string().min(2, 'City is required'),
  state:     z.string().min(2, 'State is required'),
  address:   z.string().min(5, 'Address must be at least 5 characters'),
  landmark:  z.string().optional(),
});

export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  paymentMethod: z.enum(['cod', 'card', 'upi'], {
    required_error: 'Select a payment method',
  }),
});
