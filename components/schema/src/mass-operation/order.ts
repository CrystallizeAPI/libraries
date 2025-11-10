import { z } from 'zod';
import { UpdateOrderInputSchema, RegisterOrderInputSchema } from '../pim';
import { checkResourceIdentifierOrId, RefSchema, ResourceIdentifierSchema } from '../shared';

export const RegisterOrderOperationSchema = RegisterOrderInputSchema.extend({
    _ref: RefSchema.optional(),
    intent: z.literal('order/register'),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});
export type RegisterOrderOperation = z.infer<typeof RegisterOrderOperationSchema>;

export const UpdateOrderOperationSchema = UpdateOrderInputSchema.omit({ id: true })
    .extend({
        _ref: RefSchema.optional(),
        intent: z.literal('order/update'),
        id: UpdateOrderInputSchema.shape.id.optional(),
        resourceIdentifier: ResourceIdentifierSchema.optional(),
    })
    .superRefine(checkResourceIdentifierOrId);

export type UpdateOrderOperation = z.infer<typeof UpdateOrderOperationSchema>;

export const UpsertOrderOperationSchema = RegisterOrderInputSchema.omit({
    pipelines: true,
}).extend({
    _ref: RefSchema.optional(),
    intent: z.literal('order/upsert'),
    id: UpdateOrderInputSchema.shape.id.optional(),
    resourceIdentifier: ResourceIdentifierSchema.optional(),
});

export type UpsertOrderOperation = z.infer<typeof UpsertOrderOperationSchema>;
