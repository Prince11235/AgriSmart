import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  roleOverride: z.string().optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  role: z.enum([
    'Farmer',
    'Expert',
    'Agricultural Officer',
    'Marketplace Seller',
    'Government Admin',
    'Super Admin',
  ]),
});

export const farmerProfileSchema = z.object({
  farmAreaAcres: z.coerce.number().min(0.1),
  soilType: z.string().min(1),
  experienceYears: z.coerce.number().min(0),
  preferredLanguage: z.string(),
  irrigationType: z.string(),
  primaryCrops: z.string().optional(),
  village: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
});
