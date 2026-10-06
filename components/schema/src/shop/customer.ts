import { z } from 'zod';
import { AddressSchema, AddressTypeSchema } from './from-core/address';
import { CustomerSchema } from './from-core/customer';
import { KeyValueInputSchema, MetaInputSchema } from './from-core/metadata';

// Shop API `/customer` endpoint: customers are keyed by `identifier` and have no `isGuest` flag

export const AddressInputSchema = AddressSchema.extend({
    type: AddressTypeSchema.optional(),
    meta: MetaInputSchema.optional(),
});
export type AddressInput = z.infer<typeof AddressInputSchema>;

export const CustomerWithIdentifierInputSchema = CustomerSchema.omit({
    isGuest: true,
    meta: true,
    externalReferences: true,
    addresses: true,
    type: true,
}).extend({
    identifier: z.string(),
    type: z.enum(['individual', 'organization']).optional(),
    meta: MetaInputSchema.optional(),
    externalReferences: z.array(KeyValueInputSchema).optional(),
    addresses: z.array(AddressInputSchema).optional(),
});
export type CustomerWithIdentifierInput = z.infer<typeof CustomerWithIdentifierInputSchema>;

export const CustomerWithIdentifierSchema = CustomerSchema.omit({
    isGuest: true,
}).extend({
    identifier: z.string(),
});
export type CustomerWithIdentifier = z.infer<typeof CustomerWithIdentifierSchema>;
