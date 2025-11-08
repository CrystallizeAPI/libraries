import { z } from 'zod';
import { UpdateOrderInputSchema, RegisterOrderInputSchema } from '../pim';
import { checkTuriOrId, RefSchema, TURISchema } from '../shared';

export const RegisterOrderOperationSchema = RegisterOrderInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('order/register'),
    turi: TURISchema.optional(),
});
export type RegisterOrderOperation = z.infer<typeof RegisterOrderOperationSchema>;

export const UpdateOrderOperationSchema = UpdateOrderInputSchema.omit({ id: true })
    .extend({
        _ref: RefSchema.optional(),
        intent: z.literal('order/update'),
        id: UpdateOrderInputSchema.shape.id.optional(),
        turi: TURISchema.optional(),
    })
    .superRefine(checkTuriOrId);

export type UpdateOrderOperation = z.infer<typeof UpdateOrderOperationSchema>;

export const UpsertOrderOperationSchema = RegisterOrderInputSchema.omit({
    pipelines: true,
}).extend({
    _ref: RefSchema.optional(),
    intent: z.literal('order/upsert'),
    id: UpdateOrderInputSchema.shape.id.optional(),
    turi: TURISchema.optional(),
});

export type UpsertOrderOperation = z.infer<typeof UpsertOrderOperationSchema>;
