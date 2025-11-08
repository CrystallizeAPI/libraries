import { z } from 'zod';
import { DateTimeSchema, KeyValuePairSchema } from '../../shared';
import { AddressSchema } from '../addresses';

export const CustomerParentTypeSchema = z.enum(['customer', 'customerGroup']);
export type CustomerParentType = z.infer<typeof CustomerParentTypeSchema>;

export const CustomerTypeSchema = z.enum(['individual', 'organization']);
export type CustomerType = z.infer<typeof CustomerTypeSchema>;

export const CustomerParentSchema = z.object({
    identifier: z.string().min(1).optional(),
    type: CustomerParentTypeSchema.optional(),
});
export type CustomerParent = z.infer<typeof CustomerParentSchema>;

export const CustomerSchema = z.object({
    identifier: z.string().optional(),
    email: z.email().nullish(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    middleName: z.string().nullish(),
    companyName: z.string().nullish(),
    phone: z.string().nullish(),
    taxNumber: z.string().nullish(),
    birthDate: DateTimeSchema.nullish(),
    type: CustomerTypeSchema.nullish(),
    externalReferences: z.array(KeyValuePairSchema).nullish(),
    meta: z.array(KeyValuePairSchema).nullish(),
    addresses: z.array(AddressSchema).nullish(),
    parents: z.array(CustomerParentSchema).nullish(),
    childCount: z.number().optional(),
});
export type Customer = z.infer<typeof CustomerSchema>;
