import { z } from 'zod';
import { CustomerSchema } from '../customer.js';
import { AddressSchema } from '../address.js';
import { KeyValueInputSchema, MetaInputSchema } from '../metadata.js';

export const CustomerInputSchema = CustomerSchema.omit({
    meta: true,
    externalReferences: true,
    addresses: true,
    isGuest: true,
    type: true,
}).extend(
    z.object({
        meta: MetaInputSchema.optional(),
        isGuest: z.boolean(),
        type: z.enum(['individual', 'organization']),
        externalReferences: z.array(KeyValueInputSchema).optional(),
        addresses: z.array(
            AddressSchema.omit({
                meta: true,
            }).merge(
                z.object({
                    meta: MetaInputSchema.optional(),
                }),
            ),
        ),
    }).shape,
);
export type CustomerInput = z.infer<typeof CustomerInputSchema>;
