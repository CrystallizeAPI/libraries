import { z } from 'zod';
import { AddressSchema } from './address';
import { DatedModelSchema, MetaSchema } from './metadata';

export const CustomerSchema = z
    .object({
        isGuest: z.boolean().optional(),
        identifier: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        middleName: z.string().optional(),
        birthDate: z.date().optional(),
        companyName: z.string().optional(),
        taxNumber: z.string().optional(),
        addresses: z.array(AddressSchema).optional(),
        type: z.enum(['individual', 'organization']).optional(),
        meta: MetaSchema.optional(),
        externalReferences: z.record(z.string(), z.string().optional()).optional(),
    })
    .strict();

export type Customer = z.infer<typeof CustomerSchema>;
