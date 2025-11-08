import { z } from 'zod';
import { DateTimeSchema, KeyValuePairInputSchema } from '../../shared';
import { AddressInputSchema } from '../addresses/address-input';
import { CustomerParentTypeSchema, CustomerTypeSchema } from './customer';

export const CustomerParentInputSchema = z.object({
    identifier: z.string().min(1),
    type: CustomerParentTypeSchema,
});
export type CustomerParentInput = z.infer<typeof CustomerParentInputSchema>;

export const CreateCustomerInputSchema = z.object({
    identifier: z.string(),
    email: z.email().nullish(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    middleName: z.string().nullish(),
    companyName: z.string().nullish(),
    phone: z.string().nullish(),
    taxNumber: z.string().nullish(),
    birthDate: DateTimeSchema.nullish(),
    type: CustomerTypeSchema.nullish(),
    externalReferences: z.array(KeyValuePairInputSchema).nullish(),
    meta: z.array(KeyValuePairInputSchema).nullish(),
    addresses: z.array(AddressInputSchema).nullish(),
    parents: z.array(CustomerParentInputSchema).nullish(),
});
export type CreateCustomerInput = z.infer<typeof CreateCustomerInputSchema>;

export const UpdateCustomerInputSchema = CreateCustomerInputSchema.partial().extend({
    identifier: z.string().min(1),
});
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerInputSchema>;

export const CreateCustomerGroupInputSchema = z.object({
    identifier: z.string().min(1),
    name: z.string().nullish(),
    parents: z.array(CustomerParentInputSchema).nullish(),
});
export type CreateCustomerGroupInput = z.infer<typeof CreateCustomerGroupInputSchema>;

export const UpdateCustomerGroupInputSchema = CreateCustomerGroupInputSchema.partial().extend({
    identifier: z.string().min(1),
});
export type UpdateCustomerGroupInput = z.infer<typeof UpdateCustomerGroupInputSchema>;
