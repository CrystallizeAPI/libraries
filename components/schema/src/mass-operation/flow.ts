import { z } from 'zod';
import { UpdateFlowInputSchema, CreateFlowInputSchema } from '../pim';
import { RefSchema } from '../shared';

export const CreateFlowOperationSchema = CreateFlowInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('flow/create'),
    identifier: z.string().min(1),
});
export type CreateFlowOperation = z.infer<typeof CreateFlowOperationSchema>;

export const UpdateFlowOperationSchema = UpdateFlowInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('flow/update'),
    identifier: z.string().min(1),
});
export type UpdateFlowOperation = z.infer<typeof UpdateFlowOperationSchema>;

export const UpsertFlowOperationSchema = CreateFlowInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('flow/upsert'),
    identifier: z.string().min(1),
});

export type UpsertFlowOperation = z.infer<typeof UpsertFlowOperationSchema>;
