import { z } from 'zod';
import { MetaSchema } from './metadata.js';

export const AddressTypeSchema = z.enum(['delivery', 'billing', 'other']);
export type AddressType = z.infer<typeof AddressTypeSchema>;

export const AddressSchema = z.object({
    type: AddressTypeSchema,
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    street: z.string().optional(),
    street2: z.string().optional(),
    streetNumber: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    meta: MetaSchema.optional(),
});
export type Address = z.infer<typeof AddressSchema>;
