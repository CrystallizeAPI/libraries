import { z } from 'zod';
import { KeyValuePairSchema } from '../../shared';

export const AddressTypeSchema = z.enum(['billing', 'delivery', 'other']);
export type AddressType = z.infer<typeof AddressTypeSchema>;

export const AddressSchema = z.object({
    city: z.string().nullish(),
    country: z.string().nullish(),
    email: z.email().nullish(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    middleName: z.string().nullish(),
    phone: z.string().nullish(),
    postalCode: z.string().nullish(),
    state: z.string().nullish(),
    street: z.string().nullish(),
    street2: z.string().nullish(),
    streetNumber: z.string().nullish(),
    meta: z.array(KeyValuePairSchema).nullish(),
    type: AddressTypeSchema.optional(),
});
export type Address = z.infer<typeof AddressSchema>;
