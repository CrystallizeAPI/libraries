import { z } from 'zod';
import {
    CreateCustomerInputSchema,
    UpdateCustomerInputSchema,
    CreateCustomerGroupInputSchema,
    UpdateCustomerGroupInputSchema,
} from '../pim';
import { RefSchema } from '../shared';

export const CreateCustomerOperationSchema = CreateCustomerInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('customer/create'),
});
export type CreateCustomerOperation = z.infer<typeof CreateCustomerOperationSchema>;

export const UpdateCustomerOperationSchema = UpdateCustomerInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('customer/update'),
});
export type UpdateCustomerOperation = z.infer<typeof UpdateCustomerOperationSchema>;

export const UpsertCustomerOperationSchema = CreateCustomerInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('customer/upsert'),
});
export type UpsertCustomerOperation = z.infer<typeof UpsertCustomerOperationSchema>;

export const CreateCustomerGroupOperationSchema = CreateCustomerGroupInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('customer/group/create'),
});
export type CreateCustomerGroupOperation = z.infer<typeof CreateCustomerGroupOperationSchema>;

export const UpdateCustomerGroupOperationSchema = UpdateCustomerGroupInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('customer/group/update'),
});
export type UpdateCustomerGroupOperation = z.infer<typeof UpdateCustomerGroupOperationSchema>;

export const UpsertCustomerGroupOperationSchema = CreateCustomerGroupInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('customer/group/upsert'),
});
export type UpsertCustomerGroupOperation = z.infer<typeof UpsertCustomerGroupOperationSchema>;
