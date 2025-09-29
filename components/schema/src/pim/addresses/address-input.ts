import { z } from 'zod';
import { KeyValuePairInputSchema } from '../../shared';
import { AddressTypeSchema } from './address';

export const AddressInputSchema = z.object({
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
    meta: z.array(KeyValuePairInputSchema).nullish(),
    type: AddressTypeSchema,
});
export type AddressInput = z.infer<typeof AddressInputSchema>;
