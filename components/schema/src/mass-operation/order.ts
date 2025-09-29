import { z } from 'zod';
import { UpdateOrderInputSchema, RegisterOrderInputSchema } from '../pim';

export const RegisterOrderOperationSchema = RegisterOrderInputSchema.extend({
    intent: z.literal('order/register'),
});
export type RegisterOrderOperation = z.infer<typeof RegisterOrderOperationSchema>;

export const UpdateOrderOperationSchema = UpdateOrderInputSchema.extend({
    intent: z.literal('order/update'),
});
export type UpdateOrderOperation = z.infer<typeof UpdateOrderOperationSchema>;

export const UpsertOrderOperationSchema = RegisterOrderInputSchema.omit({
    pipelines: true,
}).extend({
    intent: z.literal('order/upsert'),
    id: UpdateOrderOperationSchema.shape.id.optional(),
});
export type UpsertOrderOperation = z.infer<typeof UpsertOrderOperationSchema>;
