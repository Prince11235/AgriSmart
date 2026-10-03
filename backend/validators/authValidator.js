import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z
    .enum(['Farmer', 'Expert', 'Agricultural Officer', 'Marketplace Seller', 'Government Admin', 'Super Admin'])
    .optional(),
  phone: z.string().optional(),
  location: z.object({}).passthrough().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  roleOverride: z.string().optional(),
});
