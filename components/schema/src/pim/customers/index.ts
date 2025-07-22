import { z } from 'zod';
import { DateTimeSchema, KeyValuePairInputSchema } from '../../shared';

const CustomerAddressInputSchema = z.object({
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
    meta: z.array(KeyValuePairInputSchema).optional(),
    type: z.enum(['billing', 'delivery', 'other']),
});
export type CustomerAddressInput = z.infer<typeof CustomerAddressInputSchema>;

export const CustomerParentInputSchema = z.object({
    identifier: z.string().min(1),
    type: z.enum(['customer', 'customerGroup']),
});
export type CustomerParentInput = z.infer<typeof CustomerParentInputSchema>;

export const CreateCustomerInputSchema = z.object({
    identifier: z.string().min(1),
    email: z.email().nullish(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    middleName: z.string().nullish(),
    companyName: z.string().nullish(),
    phone: z.string().nullish(),
    taxNumber: z.string().nullish(),
    birthDate: DateTimeSchema.nullish(),
    type: z.enum(['individual', 'organization']),
    externalReferences: z.array(KeyValuePairInputSchema).optional(),
    meta: z.array(KeyValuePairInputSchema).optional(),
    addresses: z.array(CustomerAddressInputSchema).optional(),
    parents: z.array(CustomerParentInputSchema).optional(),
});
export type CreateCustomerInput = z.infer<typeof CreateCustomerInputSchema>;

export const UpdateCustomerInputSchema = CreateCustomerInputSchema.partial().extend({
    identifier: z.string().min(1),
});
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerInputSchema>;

export const CreateCustomerGroupInputSchema = z.object({
    identifier: z.string().min(1),
    name: z.string().nullish(),
    parents: z.array(CustomerParentInputSchema).optional(),
});
export type CreateCustomerGroupInput = z.infer<typeof CreateCustomerGroupInputSchema>;

export const UpdateCustomerGroupInputSchema = CreateCustomerGroupInputSchema.partial().extend({
    identifier: z.string().min(1),
});
export type UpdateCustomerGroupInput = z.infer<typeof UpdateCustomerGroupInputSchema>;
